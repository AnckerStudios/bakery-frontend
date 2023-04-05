import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { Observable, of } from 'rxjs';
import { products } from '../data/products';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = 'http://localhost:8080/api/product';
  
 
  constructor( private http: HttpClient) { }

  getProduct(id: string): Observable<IProduct> {
    
    return this.http.get<IProduct>(`${this.productUrl}/findById/${id}`);
  }

  getImage(productId:string):Observable<ArrayBuffer>{
    return this.http.get(`${this.productUrl}/image/${productId}`, {responseType: 'arraybuffer'});
  }

  createProduct(file: File) : Observable<number>{
    let formData = new FormData();
    formData.append('product', "sss");
    formData.append('image',file,file.name);
    console.log("прием прием я 1 "+file.name);
    return this.http.post<number>(this.productUrl+'/ss',formData);
    
  }
}
