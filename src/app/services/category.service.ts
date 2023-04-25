import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from '../model/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryURL =  `${environment.apiUrl}/api/category`;
  categories: string[] = [];
  constructor( private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoryURL);
  }
  save(body:ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.categoryURL,body);
  }
  update(body:ICategory): Observable<ICategory>{
    return this.http.put<ICategory>(this.categoryURL,body);
  }
  delete(category: ICategory): Observable<ICategory>{
    return this.http.delete<ICategory>(this.categoryURL,{ params: new HttpParams().set('id', category.id)});
  }
}
