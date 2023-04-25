import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IBakery } from 'src/app/model/bakery';
import { ICategory } from 'src/app/model/category';
import { IIngredient } from 'src/app/model/ingredient';
import { ModalComponent } from 'src/app/model/modal.component';
import { IProduct } from 'src/app/model/product';
import { IProductBakery } from 'src/app/model/productBakery';
import { IProductPrice } from 'src/app/model/productCategories';
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
export class SaveProductComponent implements ModalComponent, OnInit, OnDestroy {
  @Output() response = new EventEmitter<IProductPrice>();
  mes = '';
  constructor(
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private fb: FormBuilder,
    private md: ModalDialogService,
    private productService: ProductService,
    public selectBakeryS: SelectBakeryService
  ) { }
  form = this.fb.group({
    bakery: this.fb.group({
      id: [''],
      name: [''],
      address: ['']
    }),
    product: this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      category: this.fb.control('', [Validators.required]),
      volume: [0, [Validators.required]],
      ingredients: this.fb.array<IIngredient>([], [Validators.required])
    }),
    price: [0, [Validators.required]],


  })
  imagePreview?: string;
  selectFile?: File;
  categories?: ICategory[];
  ingredients?: IIngredient[];
  step = false;
  selectBakery?: IBakery;
  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    console.log("form", this.form);


    this.selectBakery = this.selectBakeryS.bakery.getValue();
    let productBakery = this.md.getInput<IProductPrice>();
    if (productBakery) {
      this.form.patchValue({
        bakery: {
          id: this.selectBakery?.id || '',
          name: this.selectBakery?.name || '',
          address: this.selectBakery?.address || ''
        },
        product: {
          id: productBakery.product.id || '',
          name: productBakery.product.name,
          category: productBakery.product.category?.id,
          volume: productBakery.product.volume,
        },
        price: productBakery.price || NaN,

      })
      this.setIngredients(productBakery.product.ingredients)
    }
    this.getCategories();
    this.getIngredients();
    this.getImage();
  }
  trackByItems(index: number, item: IIngredient): string {
    return item.id as string;
  }

  getImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    this.productService.getImage(this.form.value.product?.id as string).subscribe(item => {
      reader.readAsDataURL(new Blob([item]));
      this.selectFile = new File([item], 'file', { type: 'image/png', lastModified: new Date().getDate() });
    });
  }
  setIngredients(ingredients: IIngredient[]) {
    for (let item of ingredients) {
      this.formIngredients.push(this.fb.control(item));
    }
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(items => {
      this.categories = items;
    });
  }
  getIngredients() {
    this.ingredientService.getIngredients().subscribe(items => {
      this.ingredients = items;
    });
  }


  get formIngredients() {
    return this.form?.get('product')?.get('ingredients') as FormArray;
  }
  addIngredient(ingredient: IIngredient) {
    this.formIngredients.push(this.fb.control(ingredient));
  }
  delIngredient(ingredient: IIngredient) {
    this.formIngredients.removeAt(this.formIngredients.controls.findIndex(item => item.value.id === ingredient.id))

  }
  isSelect(ingredient: IIngredient): boolean {
    return this.formIngredients && !!this.formIngredients.controls.find(item => item.value.id === ingredient.id);
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
    if (!this.form?.valid) {
      this.mes = 'Заполните все поля'
      return;
    }
    if (!this.selectFile) {
      this.mes = 'Выберете изображение'
      return;
    }
    //this.selectFile
    let product: IProduct = {
      id: this.form.value.product?.id!,
      name: this.form.value.product?.name!,
      category: this.categories?.find(x => x.id == this.form.value.product?.category!),
      volume: this.form.value.product?.volume!,
      ingredients: this.form.getRawValue().product?.ingredients as IIngredient[]
    }

    if (this.selectBakery) {
      this.productService.createProduct(this.selectFile, product, this.selectBakery, this.form.value.price!)
      .pipe(
        takeUntil(this.destroy$)
      )
        .subscribe({
          next: (data) => {
            this.response.emit({
              product: data.product,
              price: data.price,
              inBakery: true
            });
          },
          error: (e) => console.error("r err", e)
        })
    } else {
      this.productService.saveProduct(this.selectFile, product)
      .pipe(
        takeUntil(this.destroy$)
      )
        .subscribe({
          next: (data) => {
            this.response.emit({
              product: data,
              price: undefined,
              inBakery: true
            });
          },
          error: (e) => console.error("r err", e)
        })



      // this.productService.createProduct(this.selectFile!,this.form.getRawValue() as IProduct,this.selectBakery, this.form.value.price).subscribe()

    }

  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
