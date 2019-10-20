import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'fav-logo',
  templateUrl: './fav-logo.component.html',
  styleUrls: ['./fav-logo.component.css']
})
export class FavLogoComponent implements OnInit {

  @Input() coinId:any;
  @Input() favIds:any = [];

  public imgPath:any;
  public path_1:any = "assets/heart_on.png";
  public path_2:any = "assets/heart_off.png";

  constructor() { }

  ngOnInit() {
    if(this.favIds.length==0){
      this.imgPath = this.path_2;
    }else{
      for(let i in this.favIds){
        if(this.favIds[i]==this.coinId){
          this.imgPath = this.path_1;
          break;
        } else {
          this.imgPath = this.path_2;
        }
      }
    }
 
  }

}
