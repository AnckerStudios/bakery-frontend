import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { AddIngredientComponent } from 'src/app/components/modal-dialog/add-ingredient/add-ingredient.component';
import { IIngredient } from 'src/app/model/ingredient';
import { Modal } from 'src/app/model/modal';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.css']
})
export class IngredientsPageComponent {
  constructor(private ingredientService: IngredientService, private ms: ModalDialogService){}
  
  ingredients?: IIngredient[];

  ngOnInit(): void {
    this.getIngredients();
  }
  
  getIngredients(){
    this.ingredientService.getIngredients().subscribe(item => {this.ingredients = item;
    console.log(this.ingredients)});
  }
  del(delItemId: string){
    this.ingredients = this.ingredients?.filter((item) => item.id != delItemId);
  }
  add(){
    this.ms.openDialog<IIngredient>(undefined,AddIngredientComponent).subscribe({
      next:(data)=>{
        this.ingredients?.push(data);
      },
      error:e=>{

      }
    })
  }
}
