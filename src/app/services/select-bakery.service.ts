import { Injectable } from '@angular/core';
import { IBakery } from '../model/bakery';
import { IProductCategories } from '../model/productCategories';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectBakeryService {
  public selectBakery?:IBakery;
  public bakery: Subject<IBakery|undefined> = new Subject<IBakery|undefined>;

  public productCategories: IProductCategories[] = [];
  private productCategoriesUrl = 'http://localhost:8080/api/productBakery/findByBakery/';
  constructor(private http: HttpClient) { }

 changeBakery(bakery: IBakery|undefined){
  this.bakery.next(bakery);
 }

  getCategories(bakery: IBakery): Observable<IProductCategories[]> {
    return this.http.get<IProductCategories[]>(this.productCategoriesUrl + bakery?.id);
  }
}
