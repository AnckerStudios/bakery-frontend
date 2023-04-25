import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IIngredient } from 'src/app/model/ingredient';
import { IProductPrice } from 'src/app/model/productCategories';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { SelectBakeryService } from 'src/app/services/select-bakery.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {
  @Output() response = new EventEmitter<IProductPrice>();
  status?: string;
  productPrice?: IProductPrice;
  mes = '';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private pbs: SelectBakeryService,
    private fb: FormBuilder,
    public md: ModalDialogService) { }

  form = this.fb.group({
    price: [0, [Validators.required]]
  })

  ngOnInit() {
    this.productPrice = this.md.getInput<IProductPrice>();

    // this.md.inputData
  }
  submit() {

    if (!this.form.valid) {
      this.mes = 'Введите цену';
      return;
    }
    this.status = 'loading'
    if (this.productPrice) {
      this.pbs.addProductInBakery(this.productPrice.product, this.form.value.price!)
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
        error: (e) => {
          this.status = 'error'
        }
      });
    }
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
