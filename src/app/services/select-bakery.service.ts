import { Injectable } from '@angular/core';
import { IBakery } from '../model/bakery';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IProductBakery } from '../model/productBakery';
import { IProduct } from '../model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectBakeryService {
  public selectBakery?:IBakery;
  public bakery: BehaviorSubject<IBakery|undefined> = new BehaviorSubject<IBakery|undefined>(undefined);

  
  private url =  `${environment.apiUrl}/api/productBakery`;
  constructor(private http: HttpClient) { }

 changeBakery(bakery: IBakery|undefined){
  this.bakery.next(bakery);
 }

  getProductBakery(bakery: IBakery): Observable<IProductBakery[]> {
    return this.http.get<IProductBakery[]>(`${this.url}/findByBakery/${bakery?.id}`);
  }
  delProductBakery(bakery:IBakery, product:IProduct): Observable<IProductBakery>{
    return this.http.delete<IProductBakery>(`${this.url}/${bakery?.id}/del/${product?.id}`);
  }
  addProductInBakery(product:IProduct,price:number): Observable<IProductBakery> {
    return this.http.get<IProductBakery>(`${this.url}/${this.bakery.getValue()!.id}/add/${product.id}`,{ params: new HttpParams().set('price', price)});
  }
}
