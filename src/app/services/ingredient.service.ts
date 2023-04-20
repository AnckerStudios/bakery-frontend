import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { INGREDIENTS } from '../data/ingredients';
import { IIngredient } from '../model/ingredient';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredientURL = 'http://localhost:8080/api/ingredient';
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  getIngredients(): Observable<IIngredient[]> {
    return this.http.get<IIngredient[]>(this.ingredientURL)
    // .pipe(delay(2000));
    //return INGREDIENTS;
  }
  create(body: IIngredient): Observable<IIngredient> {
    console.log("fasdfasfasf", body)
    return this.http.post<IIngredient>(this.ingredientURL, body);
  }
  update(body: IIngredient): Observable<IIngredient> {
    return this.http.put<IIngredient>(this.ingredientURL, body);
  }
  delete(id: string) {
    return this.http.delete<IIngredient>(`${this.ingredientURL}/${id}`).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error);
    return throwError(() => error.message);
  }
}
