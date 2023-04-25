import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { IIngredient } from '../model/ingredient';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private url =  `${environment.apiUrl}/api/ingredient`;
  ingredients:string[] = [];
  constructor(
    private http: HttpClient,
  ) { }

  getIngredients(): Observable<IIngredient[]> {
    return this.http.get<IIngredient[]>(this.url);
  }
  save(body: IIngredient): Observable<IIngredient> {
    return this.http.post<IIngredient>(this.url, body);
  }
  update(body: IIngredient): Observable<IIngredient> {
    return this.http.put<IIngredient>(this.url, body);
  }
  delete(data: IIngredient): Observable<IIngredient> {
    return this.http.delete<IIngredient>(`${this.url}/${data.id}`);
  }
}
