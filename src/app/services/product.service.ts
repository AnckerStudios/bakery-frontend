import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { Observable, of } from 'rxjs';
import { products } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProduct(id: string): Observable<IProduct> {
    const hero = products.find(p => p.id === id)!;
    return of(hero);
  }
}
