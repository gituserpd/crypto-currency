import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  public success:number = 0;
  public compareData:any = [];
  public compareIds:any = [];
  public convert:string;

  constructor(private cryptoService:CryptoService, private route:ActivatedRoute, private location:Location) {
    console.log("Compare Component");
   }

  ngOnInit() {
    window.scrollTo(0,0);
    this.success = 0;
    this.compareIds.push(this.route.snapshot.paramMap.get('id1'));
    this.compareIds.push(this.route.snapshot.paramMap.get('id2'));
    this.convert = this.route.snapshot.paramMap.get('convert');
    this.cryptoService.getDataByMultipleIds(this.compareIds, this.convert).subscribe(
      data => {
        this.success = 1;
        console.log("Getting Data for Compare only");
        this.compareData = data["data"];
        console.log(this.compareData);
      },
      error => {
        this.success = -1;
        console.log("Some Error");
        console.log(error.errorMessage);
      }
    )

  }

  public goBackPreviousPgae():any{
    this.location.back();
  }

  public reload():any{
    window.location.reload();
  }

  

}
