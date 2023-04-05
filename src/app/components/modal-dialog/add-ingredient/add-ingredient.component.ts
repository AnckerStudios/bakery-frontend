import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent {
  @Output() response = new EventEmitter<FormGroup>();
  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ])
  })
  get name(){
    return this.form.controls.name as FormControl;
  }
  submit(){
    if(!this.name.errors?.['required']){
      this.response.emit(this.form);
    }
  }
}
