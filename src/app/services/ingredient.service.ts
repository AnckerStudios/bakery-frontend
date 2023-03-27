import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INGREDIENTS } from '../data/ingredients';
import { IIngredient } from '../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor() { }

  getIngredients(): Observable<IIngredient[]>{
    return of(INGREDIENTS);
  }
}
