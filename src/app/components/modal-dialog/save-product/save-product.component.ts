import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/app/model/category';
import { IIngredient } from 'src/app/model/ingredient';
import { ModalComponent } from 'src/app/model/modal.component';
import { IProduct } from 'src/app/model/product';
import { IProductBakery } from 'src/app/model/productBakery';
import { CategoryService } from 'src/app/services/category.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { ProductService } from 'src/app/services/product.service';
import { SelectBakeryService } from 'src/app/services/select-bakery.service';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.css']
})
export class SaveProductComponent implements ModalComponent{
  @Output() response = new EventEmitter<IProduct>();
  constructor(
    private categoryService: CategoryService, 
    private ingredientService: IngredientService, 
    private fb: FormBuilder, 
    private md: ModalDialogService, 
    private productService: ProductService,
    private selectBakery: SelectBakeryService
    ) { }
  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    category: this.fb.control<ICategory>(undefined as unknown as ICategory, [Validators.required]),
    volume: [0,[Validators.required]],
    price: [0, [Validators.required]],
    ingredients: this.fb.array<IIngredient>([], [Validators.required])
  })
  imagePreview?: string;
  selectFile?: File;
  categories?: ICategory[];
  ingredients?: IIngredient[];
  step = false;
  ngOnInit() {
    let productBakery = this.md.getInput<IProductBakery>();
    productBakery && this.form.setValue({
      id: productBakery.product.id!,
      name: productBakery.product.name,
      category: productBakery.product.category!,
      volume: productBakery.product.volume,
      price: productBakery.price,
      ingredients: productBakery.product.ingredients

    })
    this.getCategories();
    this.getIngredients();

    // if (productBakery.product.id) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imagePreview = reader.result as string;
    //   };
    //   reader.readAsDataURL(this.form.value.image);
    // }
  }
  trackByItems(index: number, item: IIngredient): string {
    return item.id as string;
  }
  getImage() {

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
  delIngredient(ingredient: IIngredient) {
    this.formIngredients.removeAt(this.formIngredients.controls.findIndex(item => item.value.id === ingredient.id))

  }
  isSelect(ingredient: IIngredient): boolean {
    return !!this.formIngredients.controls.find(item => item.value.id === ingredient.id);
  }
  onImagePicked(event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    this.selectFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log("VALID", this.form.getRawValue(), this.form.getRawValue() as IProduct);
    if (this.form?.valid && this.selectBakery.bakery && this.selectFile) {
      
      
      // this.productService.createProduct(this.selectFile!,this.form.getRawValue() as IProduct,this.selectBakery.bakery.id!, this.form.value.price!).subscribe()
      
    }


    console.log(this.form);
  }
}
