import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IIngredient } from 'src/app/model/ingredient';
import { Modal } from 'src/app/model/modal';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-modal-form-ingredient',
  templateUrl: './modal-form-ingredient.component.html',
  styleUrls: ['./modal-form-ingredient.component.css']
})
export class ModalFormIngredientComponent {
  @Output() response = new EventEmitter<IIngredient>();
  @Input() ingredient?:IIngredient;
  constructor(private ingredientService: IngredientService, private modalService: ModalDialogService, private fb: FormBuilder) { }
  ngOnInit(){
    //this.ingredient && this.form.setValue()
    console.log("Priem",this.ingredient)
    this.setForm();
    console.log("Perm 2",this.form.getRawValue())
  }
  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]]
  })

  setForm(){
    this.ingredient && this.form.setValue({
      id:this.ingredient.id!,
      name: this.ingredient.name
    });
  }

  submit() {
    // this.modalService.modalType = Modal.hide;
    // this.response.emit(this.form.getRawValue() as IIngredient);
  }
}
