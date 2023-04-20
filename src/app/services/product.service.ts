import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { Observable, of } from 'rxjs';
import { products } from '../data/products';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProductBakery } from '../model/productBakery';
import { BakeryService } from './bakery.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = 'http://localhost:8080/api/product';
  
 
  constructor( private http: HttpClient) { }

  getProduct(id: string): Observable<IProduct> {
    
    return this.http.get<IProduct>(`${this.productUrl}/findById/${id}`);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe();
  }

  getImage(productId:string):Observable<ArrayBuffer>{
    return this.http.get(`${this.productUrl}/image/${productId}`, {responseType: 'arraybuffer'});
  }

  createProduct(file: File, productBakery: IProduct, bakeryId: string, price: number) : Observable<number>{
    let formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(productBakery)], {
      type: "application/json"
  }));
    formData.append('image',file,file.name);
    console.log("прием прием я 1 "+file.name);
    return this.http.post<number>(`${this.productUrl}/createIn/${bakeryId}`,formData,{params: new HttpParams().set('price', price)});
    
  }
}
