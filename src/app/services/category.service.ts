import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryURL = 'http://localhost:8080/api/category';
  constructor( private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoryURL);
  }
  create(body:ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.categoryURL,body);
  }
  update(body:ICategory): Observable<ICategory>{
    return this.http.put<ICategory>(this.categoryURL,body);
  }
  delete(id: string){
    return this.http.delete<ICategory>(this.categoryURL,{ params: new HttpParams().set('id', id)});
  }
}
