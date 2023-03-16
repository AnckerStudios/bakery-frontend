import { Injectable } from '@angular/core';
import { IBakery } from '../model/bakery';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProductCategories } from '../model/productCategories';

@Injectable({
  providedIn: 'root'
})
export class BakeryService {
  private bakerysUrl = 'http://localhost:8080/api/bakery';
  private productCategoriesUrl = 'http://localhost:8080/api/productBakery/findByBakery/';

  public productCategories: IProductCategories[] = [];

  constructor( private http: HttpClient) { 
    
  }
  
  // setSelectBakery(selectBakery: IBakery):void{
  //   this.selectBakery = selectBakery;
  // }
  // getSelectBakery():Observable<IBakery>{
  //   return of(this.selectBakery);
  // }
  getBakerys(): Observable<IBakery[]> {
    return this.http.get<IBakery[]>(this.bakerysUrl);
  }
  getCategories(bakery: IBakery): void {
    this.http.get<IProductCategories[]>(this.productCategoriesUrl+bakery?.id).subscribe(selectBakery => {this.productCategories = selectBakery; console.log(this.productCategories)});
  }

}
