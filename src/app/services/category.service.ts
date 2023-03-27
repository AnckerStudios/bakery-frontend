import { HttpClient } from '@angular/common/http';
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
    console.log("ddddd")
    return this.http.post<ICategory>(this.categoryURL,body);
  }
}
