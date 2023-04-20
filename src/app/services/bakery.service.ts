import { Injectable } from '@angular/core';
import { IBakery } from '../model/bakery';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProductCategories } from '../model/productCategories';
import { SelectBakeryService } from './select-bakery.service';

@Injectable({
  providedIn: 'root'
})
export class BakeryService {
  private bakerysUrl = 'http://localhost:8080/api/bakery';
  //private createBakeryUrl = 'http://localhost:8080/api/bakery';
  private productCategoriesUrl = 'http://localhost:8080/api/productBakery/findByBakery/';

  public productCategories: IProductCategories[] = [];

  constructor(private http: HttpClient,private sb:SelectBakeryService) { }

  createBakery(newBakery: IBakery): Observable<IBakery> {
    return this.http.post<IBakery>(this.bakerysUrl, newBakery);
  }
  deleteBakery(): boolean {
    this.http.delete<IBakery>(this.bakerysUrl);
    return true;
  }

  getBakerys(): Observable<IBakery[]> {
    return this.http.get<IBakery[]>(this.bakerysUrl);
  }
  getCategories(bakery: IBakery): void {
    this.http.get<IProductCategories[]>(this.productCategoriesUrl + bakery?.id).subscribe(item => {
      this.productCategories = item;
      console.log(this.productCategories);
      // this.sb.bakery = bakery;
    });
  }

}
