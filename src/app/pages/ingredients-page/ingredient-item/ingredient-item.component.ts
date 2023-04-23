import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddIngredientComponent } from 'src/app/components/modal-dialog/add-ingredient/add-ingredient.component';
import { IIngredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css']
})
export class IngredientItemComponent {
  @Input() ingredient?: IIngredient;
  @Output() eventDel = new EventEmitter<string>();
  status?:string;
  constructor(
    private ingredientService: IngredientService,
    public ms: ModalDialogService
    ){}
  ngOnInit(){
    console.log(this.ingredient)
    
  }
 
 
  del(){
    this.status = 'loading';
    this.ingredientService.delete(this.ingredient!).subscribe({
      next: ()=> {
        this.eventDel.emit(this.ingredient?.id)
      },
      error: e=>{
        this.status = 'error'
      }
    });

  }
  edit(){
    this.ms.openDialog<IIngredient>(this.ingredient,AddIngredientComponent).subscribe({
      next:(data)=>{
        this.ingredient = data;
      }
    })
  }
 

}
