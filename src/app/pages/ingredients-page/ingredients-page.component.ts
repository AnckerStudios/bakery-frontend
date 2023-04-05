import { Component } from '@angular/core';
import { IIngredient } from 'src/app/model/ingredient';
import { Modal } from 'src/app/model/modal';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.css']
})
export class IngredientsPageComponent {
  constructor(private ingredientService: IngredientService, private modalService: ModalDialogService){}
  
  ingredients?: IIngredient[];

  ngOnInit(): void {
    this.getIngredients();
  }
  
  getIngredients(){
    this.ingredientService.getIngredients().subscribe(item => {this.ingredients = item;
    console.log(this.ingredients)});
  }
  delIngredient(delItemId: string){
    this.ingredients = this.ingredients?.filter((item) => item.id != delItemId);
  }
  addIngredient(){
    this.modalService.setModalType(Modal.addIngredient).subscribe(form => {
      console.log("Я пытаюсь добавьть ", form)
      this.ingredientService.create({
          name: form.value.name
        }).subscribe(item => {
          console.log(item);
          this.ingredients?.push(item);
        });
    });
  }
}
