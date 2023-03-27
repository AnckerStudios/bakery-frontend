import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  
  constructor(private categoryService: CategoryService){}
  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ]),
    isDrink: new FormControl<boolean>(false, [
      Validators.required
    ])
  })
  get name(){
    return this.form.controls.name as FormControl;
  }
  get isDrink(){
    return this.form.value.isDrink;
  }
  set isDrink(isDrink){
    this.form.value.isDrink = isDrink;
  }
  submit(){
    if(!this.name.errors?.['required']){
      console.log(this.form);
      this.categoryService.create({
        id:"",
        isDrink: this.isDrink as boolean,
        name: this.name.value
      }).subscribe(item => console.log(item));
    }
  }
}
