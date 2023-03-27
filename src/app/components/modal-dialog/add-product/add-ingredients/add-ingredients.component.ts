import { Component, OnInit } from '@angular/core';
import { IIngredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-add-ingredients',
  templateUrl: './add-ingredients.component.html',
  styleUrls: ['./add-ingredients.component.css']
})
export class AddIngredientsComponent implements OnInit{
  constructor(private ingredientService : IngredientService){}
  ingredients: IIngredient[] = [];
  selectedIngredients: IIngredient[] = [];

  ngOnInit() {
    this.getIngredients();
  }
  
  getIngredients(): void{
    this.ingredientService.getIngredients().subscribe(ingredients => this.ingredients = ingredients)
  }

  selectIngredient(ingredient: IIngredient){
    this.ingredients = this.ingredients.filter((item) => item.id != ingredient.id);
    this.selectedIngredients.push(ingredient);
  }
  removeIngredient(ingredient: IIngredient){
    this.selectedIngredients = this.selectedIngredients.filter((element) => {
      return element.id !== ingredient.id;
    });
    this.ingredients.push(ingredient);
  }
}
