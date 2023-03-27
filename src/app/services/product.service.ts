import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { Observable, of } from 'rxjs';
import { products } from '../data/products';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = 'http://localhost:8080/api/product/ss';
 
  constructor( private http: HttpClient) { }

  getProduct(id: string): Observable<IProduct> {
    const product = products.find(p => p.id === id)!;
    return of(product);
  }

  createProduct(file: File) : Observable<number>{
    let formData = new FormData();
    formData.append('product', "sss");
    formData.append('image',file,file.name);
    console.log("прием прием я 1 "+file.name);
    return this.http.post<number>(this.productUrl,formData);
    
  }
}
