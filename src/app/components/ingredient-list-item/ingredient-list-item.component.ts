import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IIngredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredient-list-item',
  templateUrl: './ingredient-list-item.component.html',
  styleUrls: ['./ingredient-list-item.component.css']
})
export class IngredientListItemComponent {
  @Input() ingredient?: IIngredient;
  @Output() delIngredientItem = new EventEmitter<string>();
  constructor(private ingredientService: IngredientService){}
  ngOnInit(){
    console.log(this.ingredient)
    
  }
  isEdit: boolean = false;
  onEdit(){
    this.isEdit = true;
  }
  delIngredient (){
    if(this.ingredient && this.ingredient.id){
      this.ingredientService.delete(this.ingredient.id).subscribe(()=> this.delIngredientItem.emit(this.ingredient?.id));
    }
  }
  updateIngredient(){
    if(this.ingredient){
      console.log(this.ingredient)
      this.ingredientService.update(this.ingredient).subscribe();
      this.isEdit = false;
    }
  }
}
