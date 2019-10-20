import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  public allData: any = [];
  public quoteData: any = [];
  public convertData: any = [];
  public crypto_type: string = "all";
  public convert: string = "INR";
  public sortBy: string = "market_cap";
  public change: string = "percent_change_1h";
  public limit: number = 100;
  public success: number = 0;
  public loadMoreBtn:number = 0;
  public rmFavBtn:number = 0;
  public price_range: number;
  public market_range: number;
  public favoriteIds: any = [];
  public favoriteData: any = [];
  public selectedItem: any = [];

  // FOR MAT TABLE

  public dataSource:any;
  // public allData:PeriodicEle ment = []
  // dataSource = new MatTableDataSource<PeriodicElement>(this.allData);
  displayedColumns: string[] = ['check','fav','logo','name','market_cap','price','change'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  // For Long Press
  // @ViewChild('trpress') tr: ElementRef;
  // longPress = 'first state';
  // longPressing = 0;
  // isLongPressed = false;

  constructor(public cryptoService: CryptoService, private router: Router, private elRef:ElementRef, private renderer:Renderer2) {
    console.log("List View Component");
  }

  @HostListener('click')
  public addCheckBehave = ()=>{
    // const element = this.renderer.selectRootElement('.select-item');
    // this.renderer.setAttribute(element,'disabled','true');
    // this.renderer.setAttribute(this.elRef.nativeElement,'disabled','true'); //For Add Attribute
  }
  @HostListener('click')
  public removeCheckBehave = ()=>{
    // const element = this.renderer.selectRootElement('.select-item');
    // this.renderer.removeAttribute(element,'disabled'); //For remove
  }

  ngOnInit() {
    this.favoriteIds = this.cryptoService.getFavoriteFromLocal();
    this.allFavoriteData(this.favoriteIds); //MUST BE CALL AT FIRST
    this.clearSelected();
  }


  public forMatTable= (data:string[])=>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public allFavoriteData: any = (ids: number[], convert: string) => {
    this.success = 0;
    this.loadMoreBtn = 0;
    this.clearSelected();
    // this.rmFavBtn = 0;
    this.favoriteIds = this.cryptoService.getFavoriteFromLocal();
    if (this.favoriteIds.length > 0) {
      this.cryptoService.getDataByMultipleIds(this.favoriteIds, this.convert).subscribe(
        data => {
          this.success = 1;
          this.rmFavBtn = 1;
          console.log("Getting Favorite Data only");
          this.favoriteData = data["data"];
          console.log(this.favoriteData);
          const newFavData: any[] = this.transform(this.favoriteData);
          this.forMatTable(newFavData);
        },
        error => {
          this.success = -1;
          console.log("Some Error");
          console.log(error.errorMessage);
          this.clearSelected();
        }
      )
    } else {
      this.allCryptoData();
    }
  }

  public allCryptoData: any = (limit: number) => {
    this.clearSelected();
    this.success = 0;
    this.loadMoreBtn = 0;
    this.rmFavBtn = 0;
    this.cryptoService.getAllCryptoData(this.crypto_type, this.convert, this.sortBy, this.limit).subscribe(
      data => {
        this.success = 1;
        this.loadMoreBtn = 1;
        console.log("Getting data in ListView component");
        this.allData = data["data"];
        this.forMatTable(this.allData);
        console.log(this.allData);
        this.scroll_top();
      },
      error => {
        this.success = -1;
        console.log("Some Error");
        console.log(error.errorMessage);
        this.clearSelected();
      }
    )
  }

  public transform:any = (value:any)=>{
    let values = []
    for (let key in value) {
      values.push(value[key])
    }
    return values
  }

  public loadMore: any = () => {
    this.limit = this.limit + 100;
    this.allCryptoData(this.limit);
  }

  public getStyle: any = (val: number) => {
    if (val < 0)
      return { 'color': '#ff4d3d' };
    if (val == 0)
      return { 'color': 'grey' };
    if (val > 0)
      return { 'color': '#00B616' };
  }

  public detailView = (id: number, convert: string) => {
    this.router.navigate(['/detail', id, convert]);
  }

  public scroll_top = () => {
    let scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  // Fonctions For Long Press
  // onLongPress(id:number) {
  // this.longPressing = null;
  // if (this.isLongPressed) this.tr.nativeElement.style.backgroundColor = 'green';
  // else this.tr.nativeElement.style.backgroundColor = 'orange';
  // this.isLongPressed = !this.isLongPressed;
  // this.longPress = this.isLongPressed ? 'second state' : 'first state';
  // console.log("long press"+id);
  // }
  // onLongPressing() {
  //   this.longPressing += 1;
  // }

  public checkSelected: any = (id: number) => {
    let ind = this.selectedItem.indexOf(id);
    if(ind == -1){
      this.selectedItem.push(id);
    }else{
      this.selectedItem.splice(ind,1);
    }
    console.log(this.selectedItem);
  }

  public clearSelected:any = ()=>{
    this.selectedItem = [];
  }

  public addToFavorite:any = ()=>{
    for(let item of this.selectedItem){
      if(this.favoriteIds.indexOf(item)==-1){
        this.favoriteIds.push(item);
      }
    }
    this.cryptoService.setFavoriteToLocal(this.favoriteIds);
    this.allFavoriteData();
  }

  public removeFromFavorite: any = () => {
    for(let item of this.selectedItem){
      let i = this.favoriteIds.indexOf(item)
      if(i!=-1){
        this.favoriteIds.splice(i,1);
      }
    }
    this.cryptoService.setFavoriteToLocal(this.favoriteIds);
    this.allFavoriteData();
  }


  public compareSelected:any = ()=>{
    console.log("compare function");
    let id1 = this.selectedItem[0];
    let id2 = this.selectedItem[1];
    let convert = this.convert;
    this.router.navigate(['/compare',id1,id2,convert]);
  }

  /*
  public sortData:any = (sort: Sort)=>{
    const data = this.allData.slice();
    if (!sort.active || sort.direction === '') {
      this.allData = data;
      return;
    }
    this.allData = data.sort((a,b)=>{
      const isAsc = sort.direction === 'asc';
      switch (sort.active){
        case 'market' : return this.compare(a.market, b.market, isAsc);
        case 'price' : return this.compare(a.price, b.price, isAsc);
        default : return 0;
      }
    })
  }


  public compare = (a: number|string, b: number|string, isAsc:boolean)=>{
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  */

 public doFilterPrice(value:any){
   console.log("Price: "+value);
   this.dataSource.filter = value.trim().toLowerCase();
 }
 public doFilterMarket(value:any){
  console.log("Market: "+value);
  this.dataSource.filter = value.trim().toLowerCase();
}


} //END OF MAIN CLASS
