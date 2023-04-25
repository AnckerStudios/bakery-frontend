import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { AddProductComponent } from 'src/app/components/modal-dialog/add-product/add-product.component';
import { SaveProductComponent } from 'src/app/components/modal-dialog/save-product/save-product.component';
import { IBakery } from 'src/app/model/bakery';
import { ICategory } from 'src/app/model/category';
import { IProduct } from 'src/app/model/product';
import { IProductBakery } from 'src/app/model/productBakery';
import { IProductPrice } from 'src/app/model/productCategories';
import { FilterProductPipe } from 'src/app/pipes/filter-product.pipe';
import { BakeryService } from 'src/app/services/bakery.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { ProductService } from 'src/app/services/product.service';
import { SelectBakeryService } from 'src/app/services/select-bakery.service';

interface ITest {
  category: IProduct[]
}

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit, OnDestroy {
  selectedBakery?: IBakery;
  isShow = true;
  allProducts?: Map<string, IProductPrice[]>;
  notProducts?: Map<string, IProductPrice[]> = new Map();
  status?: string;
  term = '';
  private readonly destroy$ = new Subject<void>();
  constructor(
    public bakeryService: BakeryService,
    public selectBakeryS: SelectBakeryService,
    private productService: ProductService,
    private md: ModalDialogService,
  ) { }

  ngOnInit() {
    this.getAllProduct();
    this.selectBakeryS.bakery
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        this.selectedBakery = data;
        this.isShow = true;
        data ? this.getBakeryProducts(data) : this.getAllProduct();
      }
    });

  }

  change(value: boolean) {
    this.isShow = value;
    value ? this.getBakeryProducts(this.selectedBakery!) : this.getProductsNotBakery(this.selectedBakery!)
  }

  create() {
    this.md.openDialog<IProductPrice>(undefined, SaveProductComponent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        if (data) {
          let pp : IProductPrice[] = this.allProducts?.get(data.product.category?.name!) || [];
          pp.push(data);
          let arr = this.allProducts;
          arr?.set(data.product.category?.name!,pp);
          this.allProducts = new FilterProductPipe().transform(arr!,this.term);
        }
      }
    });
  }
  del(product: IProduct) {
    if (this.isShow && this.allProducts?.has(product.category?.name!)) {
      let arr = this.allProducts;
      arr?.set(product.category?.name!, this.allProducts.get(product.category?.name!)?.filter(x => x.product.id !== product.id)!);
      this.allProducts = new FilterProductPipe().transform(arr!,this.term);
    }
  }
  edit(data: IProductPrice[]) {
    let arr = this.allProducts;
    arr?.set(data[0].product.category?.name!, this.allProducts!.get(data[0].product.category?.name!)?.filter(x => x.product.id !== data[0].product.id)!);
    let pp : IProductPrice[] = arr?.get(data[1].product.category?.name!) || [];
    pp.push(data[1]);
    arr?.set(data[1].product.category?.name!,pp);
    this.allProducts = new FilterProductPipe().transform(arr!,this.term);
  }
  getBakeryProducts(bakery: IBakery) {
    this.selectBakeryS.getProductBakery(bakery)
    .pipe(
      takeUntil(this.destroy$)
    )
      .subscribe({
        next: (item) => {
          let map = item.reduce((acc: Map<string, IProductPrice[]>, obj: IProductBakery) => {
            const property = obj.product.category!.name;
            const productPrice = {
              product: obj.product,
              price: obj.price,
              inBakery: true
            }
            acc.has(property) ? acc.get(property)?.push(productPrice) : acc.set(property, [productPrice]);
            return acc;
          }, new Map<string, IProductPrice[]>)
          this.allProducts = map;  //////////////////////////////////////////////////////
        },
        error: (e) => {
          this.status = 'error'
        }
      });
  }
  getProductsNotBakery(bakery: IBakery) {
    this.productService.getProductNotBakery(bakery.id!)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (item) => {
          let map = item.reduce((acc: Map<string, IProductPrice[]>, obj: IProduct) => {
           const property = obj.category!.name;
          const productPrice = {
              product: obj,
              price: undefined,
              inBakery: false
            }
           acc.has(property) ? acc.get(property)?.push(productPrice) : acc.set(property, [productPrice]);
           return acc;
          }, this.allProducts!)
          this.allProducts =  new FilterProductPipe().transform(map,this.term);  //////////////////////////////////////////////////////
        },
        error: (e) => {
          this.status = 'error'
        }
      });
  }
  getAllProduct() {
    this.productService.getProducts()
    .pipe(
      takeUntil(this.destroy$)
    )
      .subscribe({
        next: (item) => {
          let map = item.reduce((acc: Map<string, IProductPrice[]>, obj: IProduct) => {
            const property = obj.category!.name;
            const productPrice = {
              product: obj,
              price: undefined,
              inBakery: true
            }
            acc.has(property) ? acc.get(property)?.push(productPrice) : acc.set(property, [productPrice]);
            return acc;
          }, new Map<string, IProductPrice[]>)
          this.allProducts = map;
          // this.allProductsKey = this.allProducts;
        },
        error: (e) => {
          this.status = 'error'
        }
      })
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
