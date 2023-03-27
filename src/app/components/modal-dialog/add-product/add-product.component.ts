import { Component, OnInit } from '@angular/core';
import { IIngredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  constructor(private ingredientService : IngredientService){}
  type: boolean = false;
  step: number = 1;

  ingredients: IIngredient[] = [];
  selectedIngredients: IIngredient[] = [];




  

  ngOnInit() {
    this.getIngredients();
  }
  
  getIngredients(): void{
    this.ingredientService.getIngredients().subscribe(ingredients => this.ingredients = ingredients)
  }

  backStep(){
    this.step !== 1 && this.step--;
  }
  forwardStep(){
    this.step !== 3 && this.step++;
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
