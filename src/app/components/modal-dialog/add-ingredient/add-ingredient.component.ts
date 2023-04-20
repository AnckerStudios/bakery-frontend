import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IIngredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent {
  @Output() response = new EventEmitter<FormGroup>();
  constructor(private ingredientService: IngredientService, private ms: ModalService, private fb: FormBuilder) { }
  ngOnInit(){
    //this.ingredient && this.form.setValue()
    let ingredient = this.ms.getData<IIngredient>()
    this.setForm(ingredient);
    console.log("Perm 2",this.form.getRawValue())
  }

  setForm(ingredient: IIngredient | undefined){
    ingredient && this.form.setValue({
      id: ingredient.id!,
      name: ingredient.name
    });
  }
  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]]
  })
  get name(){
    return this.form.controls.name as FormControl;
  }
  submit(){
    if(!this.name.errors?.['required']){
      this.ingredientService.create(this.form.getRawValue() as IIngredient)
      .subscribe(item => {
        this.ms.confirm<IIngredient>(item);
      });
    }
  }
}
