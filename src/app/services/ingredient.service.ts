import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INGREDIENTS } from '../data/ingredients';
import { IIngredient } from '../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredientURL = 'http://localhost:8080/api/ingredient';
  constructor(private http: HttpClient) { }

  getIngredients(): Observable<IIngredient[]>{
    return this.http.get<IIngredient[]>(this.ingredientURL);
    //return of(INGREDIENTS);
  }
  create(body:IIngredient): Observable<IIngredient> {
    return this.http.post<IIngredient>(this.ingredientURL,body);
  }
  update(body:IIngredient): Observable<IIngredient>{
    return this.http.put<IIngredient>(this.ingredientURL,body);
  }
  delete(id: string){
    return this.http.delete<IIngredient>(this.ingredientURL,{ params: new HttpParams().set('id', id)});
  }
}
