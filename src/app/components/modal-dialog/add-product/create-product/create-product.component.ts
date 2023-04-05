import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/model/category';
import { IIngredient } from 'src/app/model/ingredient';
import { CategoryService } from 'src/app/services/category.service';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  constructor(private categoryService: CategoryService, private ingredientService: IngredientService, private fb: FormBuilder) { }
  @Input() form?: FormGroup;
  imagePreview?: string;
  selectFile?: File;
  categories?: ICategory[];
  ingredients?: IIngredient[];
  step = false;
  ngOnInit() {
    this.getCategories();
    this.getIngredients();
    if (this.form?.value.image) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.form.value.image);
    }
  }
  trackByItems(index: number, item: IIngredient): string 
  { 
    return item.id as string; 
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(items => {
      this.categories = items;
      this.form?.patchValue({
        category: this.categories[0]
      })
    });
  }
  getIngredients() {
    this.ingredientService.getIngredients().subscribe(items => {
      this.ingredients = items;
    });
  }
  get formIngredients() {
    return this.form?.get('ingredients') as FormArray;
  }
  addIngredient(ingredient: IIngredient) {
    this.formIngredients.push(this.fb.control(ingredient));
  }
  delIngredient(ingredient: IIngredient){
    this.formIngredients.removeAt(this.formIngredients.controls.findIndex(item=>item.value.id === ingredient.id))
    
  }
  isSelect(ingredient : IIngredient):boolean{
    return !!this.formIngredients.controls.find(item => item.value.id === ingredient.id);
  }
  onImagePicked(event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    this.selectFile = file;
    this.form?.patchValue({ image: file });
    //this.form?.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(){
    if(this.form?.valid){
      console.log("VALID");
    }
    console.log(this.form);
  }
}
