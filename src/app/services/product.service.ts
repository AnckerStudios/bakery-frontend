import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { Observable, of, reduce } from 'rxjs';
import { products } from '../data/products';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProductBakery } from '../model/productBakery';
import { BakeryService } from './bakery.service';
import { IBakery } from '../model/bakery';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:8080/api/product';
  
 
  constructor( private http: HttpClient) { }

  getProduct(id: string): Observable<IProduct> {
    
    return this.http.get<IProduct>(`${this.url}/findById/${id}`);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }

  saveProduct(file: File, product: IProduct): Observable<IProduct> {
    let formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], {
      type: "application/json"
  }));
    formData.append('image',file,file.name);
    return this.http.post<IProduct>(this.url,formData);
  }
  getProductNotBakery(bakeryId : string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/not/${bakeryId}`);
  }
  getImage(productId:string):Observable<ArrayBuffer>{
    return this.http.get(`${this.url}/image/${productId}`, {responseType: 'arraybuffer'});
  }

  createProduct(file: File, productBakery: IProduct, bakery?: IBakery, price?: number) : Observable<IProductBakery>{
    let formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(productBakery)], {
      type: "application/json"
  }));
    formData.append('image',file,file.name);
    console.log("прием прием я 1 "+file.name);
    return this.http.post<IProductBakery>(`${this.url}/createIn/${bakery?.id}`,formData,{ params: new HttpParams().set('price', price!)});
    
  }
  deleteProduct(product:IProduct):Observable<IProduct>{
    return this.http.delete<IProduct>(`${this.url}/${product.id}`);
  }
}
