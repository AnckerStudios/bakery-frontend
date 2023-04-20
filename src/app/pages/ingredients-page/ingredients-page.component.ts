import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
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
  constructor(private ingredientService: IngredientService, public modalService: ModalDialogService, private fb: FormBuilder, private ms: ModalService) { }
  selectIngredient?: IIngredient;
  loadIngredients: string[] = [];
  ingredients?: IIngredient[];
  notifier$ = new Subject();
  ngOnInit(): void {
    this.getIngredients();
  }
  find(item: IIngredient) {
    return this.loadIngredients.find(x => x === item.id);
  }
  submit(ingredient: IIngredient) {
    this.ingredientService.create(ingredient).subscribe(item => {
      console.log(item);
      this.ingredients?.push(item);
    });
  }
  getIngredients() {
    this.ingredientService.getIngredients()
      .pipe(takeUntil(this.notifier$))
      .subscribe(item => {
        this.ingredients = item;
        console.log(this.ingredients)
      });
  }
  delIngredient(delId: string) {
    this.loadIngredients.push(delId);
    console.log("arr", this.loadIngredients)
    this.ingredientService.delete(delId)
      .subscribe(item => {
        console.log("delete ", item);
        this.ingredients = this.ingredients?.filter((item) => item.id != delId);
      });
  }
  saveIngredient(ingredient: IIngredient) {
    ingredient.id && this.loadIngredients.push(ingredient.id);
    console.log("arr", this.loadIngredients)
    this.ingredientService.create(ingredient)
      .subscribe(item => {
        let index = this.ingredients?.findIndex(x => x.id === item.id);
        index !== -1 ? this.ingredients?.splice(index!, 1, item) : this.ingredients?.push(item);
        this.loadIngredients = this.loadIngredients.filter(x => x !== item.id);
      });

  }
  onSave(ingredient?: IIngredient) {
    this.ms.open<IIngredient>(ingredient, Modal.addIngredient).subscribe((data) => {
      console.log("MODAL 3.0",data)
      let index = this.ingredients?.findIndex(x => x.id === data.id);
      index !== -1 ? this.ingredients?.splice(index!, 1, data) : this.ingredients?.push(data);
      this.loadIngredients = this.loadIngredients.filter(x => x !== data.id);
    });
    this.selectIngredient = ingredient;
    // this.modalService.modalType = Modal.addIngredient;
  }

  ngOnDestroy() {
    this.notifier$.complete();
  }
}
