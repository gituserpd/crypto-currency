import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  // public start:number = 1;

  constructor(public http:HttpClient) {
    console.log("Service Constructor Called");
   }

  //  public uri = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5000&convert=INR"  //url with Parameters
  public baseUrl:any = "https://pro-api.coinmarketcap.com/v1/cryptocurrency"; //if not using proxy
  // public baseUrl:any = "v1/cryptocurrency/listings/latest";
  // public baseUrl:any = "v1/cryptocurrency"; //FOR Proxy Server

  public apiKey:any = "c9107fc2-1c21-4328-83b8-fea6d40e6451";

  public getDataByMultipleIds(id:number[],convert:string):Observable<any>{
    let url = `${this.baseUrl}/quotes/latest?id=${id}&convert=${convert}`
    let headers:HttpHeaders = new HttpHeaders(); 
    headers = headers.set('X-CMC_PRO_API_KEY', this.apiKey);
    return this.http.get(url, {headers})
  }

  public getAllCryptoData(crypto_type:string,convert:string,sortBy:string,limit:number):Observable<any>{
    let url = `${this.baseUrl}/listings/latest?limit=${limit}&convert=${convert}&sort=${sortBy}&cryptocurrency_type=${crypto_type}`
    let headers:HttpHeaders = new HttpHeaders(); 
      headers = headers.set('X-CMC_PRO_API_KEY', this.apiKey);
    return this.http.get(url, {headers})
  }

  public getInfoById(id:number):Observable<any>{
    let url = `${this.baseUrl}/info?id=${id}`;
    let headers:HttpHeaders = new HttpHeaders(); 
      headers = headers.set('X-CMC_PRO_API_KEY', this.apiKey);
    return this.http.get(url, {headers})
  }

  public getDataById(id:number,convert:string):Observable<any>{
    let url = `${this.baseUrl}/quotes/latest?id=${id}&convert=${convert}`;
    let headers:HttpHeaders = new HttpHeaders(); 
      headers = headers.set('X-CMC_PRO_API_KEY', this.apiKey);
    return this.http.get(url, {headers})
  } 

  public setFavoriteToLocal=(data:any[])=>{
    localStorage.setItem('MyFavorite', JSON.stringify(data));
  }

  public getFavoriteFromLocal=()=>{
    if ( !JSON.parse(localStorage.getItem('MyFavorite'))==true || JSON.parse(localStorage.getItem('MyFavorite'))==false ){
      let data:any=[];
      this.setFavoriteToLocal(data);
    } 
    return JSON.parse(localStorage.getItem('MyFavorite'));
  }


}
