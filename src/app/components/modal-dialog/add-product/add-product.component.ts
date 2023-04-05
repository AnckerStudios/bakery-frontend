import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IIngredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  constructor(private ingredientService : IngredientService, private fb: FormBuilder){}
  type: boolean = false;
  step: number = 1;
  @Output() response = new EventEmitter<FormGroup>();
  


  form = this.fb.group({
      name:['',[Validators.required]],
      image:[null,[Validators.required]],
      category:[null,[Validators.required]],
      price:[0,[Validators.required]],
      ingredients: this.fb.array([],[Validators.required])
  })


  ngOnInit() {
    
  }
  
 

  backStep(){
    this.step !== 1 && this.step--;
  }
  forwardStep(){
    this.step !== 3 && this.step++;
  }
 
}
