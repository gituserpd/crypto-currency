import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  public coinInfo:any = [];
  public coinData:any = [];
  public coinId:any;
  public convertType:string;
  public success_1:number = 0;

  constructor(private cryptoService:CryptoService, private route:ActivatedRoute, private router:Router, private location:Location) { }

  ngOnInit() {
    console.log('Price Chart View ngOnIt');
    window.scrollTo(0,0);
    this.coinId = this.route.snapshot.paramMap.get('id');
    this.convertType = this.route.snapshot.paramMap.get('convert');
    this.coinInfoById(this.coinId);
    this.coinDataById(this.coinId, this.convertType);
  }

  public coinInfoById:any = (id:number, convert:string)=>{
    this.success_1 = 0;
    this.cryptoService.getInfoById(id).subscribe(  
      data =>{
        this.success_1 = 1;
        this.coinInfo = data["data"];
          // console.log(this.coinInfo);
      },
      error =>{
        this.success_1 = 0;
        console.log("Some Error");
        console.log(error.errorMessage);
      }
    )
  }

  public coinDataById:any = (id:number, convert:string)=>{
    this.cryptoService.getDataById(id,convert).subscribe(  
      data =>{
        this.coinData = data["data"];
          console.log(this.coinData);
      },
      error =>{
        console.log("Some Error");
        console.log(error.errorMessage);
      }
    )
  }

  public goBackPreviousPgae():any{
    this.location.back();
  }


}
