import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, tap } from 'rxjs';
import { SaveProductComponent } from 'src/app/components/modal-dialog/save-product/save-product.component';
import { products } from 'src/app/data/products';
import { IBakery } from 'src/app/model/bakery';
import { ICategory } from 'src/app/model/category';
import { IProduct } from 'src/app/model/product';
import { IProductBakery } from 'src/app/model/productBakery';
import { IProductPrice } from 'src/app/model/productCategories';
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
export class MenuPageComponent {
  selectedBakery?: IBakery;
  isShow = true;
  allProducts?: Map<string, IProductPrice[]>;
  notProducts?: Map<string, IProductPrice[]> = new Map();

  term = '';
  constructor(
    public bakeryService: BakeryService,
    public selectBakeryS: SelectBakeryService,
    private productService: ProductService,
    private md: ModalDialogService,
  ) { }

  ngOnInit() {
    this.getAllProduct();
    this.selectBakeryS.bakery.subscribe({
      next: (data) => {
        this.selectedBakery = data;
        console.log(data);
        this.isShow = true;
        data ? this.getBakeryProducts(data) : this.getAllProduct(); 
        
      }
    });
    
  }

  change(value: boolean){
    this.isShow = value;
    console.log(";;;;",value,this.selectedBakery)
    value ? this.getBakeryProducts(this.selectedBakery!)  : this.getProductsNotBakery(this.selectedBakery!)

  }

  create(){
    console.log("Модальное окно CREATE товара")
    this.md.openDialog<IProductPrice>(undefined, SaveProductComponent).subscribe({
      next: (data)=>{
        console.log("llll",data);
        
        let productPrice = {
          product:  data.product ,
          price: data.price,
          inBakery: true
        }
        console.log(this.allProducts?.has(data.product.category?.name!));
        
        data && this.allProducts?.has(data.product.category?.name!) ? 
        this.allProducts?.get(data.product.category?.name!)?.push(productPrice) : 
        this.allProducts?.set(data.product.category?.name!, [productPrice]);
      },
      error: e=>{
        console.log(e);

      }
    });
  }
  add(productPrice: IProductPrice){
    console.log("Модальное окно ADD товара")
    
  }
  del(product: IProduct){
    if(this.isShow && this.allProducts?.has(product.category?.name!)){
      this.allProducts.set(product.category?.name!, this.allProducts.get(product.category?.name!)?.filter(x=>x.product.id !== product.id)!);
     }
    
  }
  edit(productPrice: IProductPrice){

  }
  getBakeryProducts(bakery: IBakery) {
    this.selectBakeryS.getProductBakery(bakery)
    .pipe(map(item => item.reduce((acc: Map<string, IProductPrice[]>, obj: IProductBakery) => {
      const property = obj.product.category!.name;
      const productPrice = {
        product: obj.product,
        price: obj.price,
        inBakery: true
      }
      acc.has(property) ? acc.get(property)?.push(productPrice) : acc.set(property, [productPrice]);
      return acc;
    }, new Map<string, IProductPrice[]>)
    ))
    .subscribe({
      next: (data) => {
        this.allProducts = data;  //////////////////////////////////////////////////////
      },
      error: (e) => {
        console.log(e)
      }
    });
  }
  getProductsNotBakery(bakery: IBakery) {
    console.log("bakery not",this.allProducts, this.notProducts);
    
    this.productService.getProductNotBakery(bakery.id!)
    .pipe(
      tap(e => console.log("products: ",e, this.allProducts)),
      map(item => item.reduce((acc: Map<string, IProductPrice[]>, obj: IProduct) => {
        console.log("item ", obj,acc);
        
      const property = obj.category!.name;
      console.log("property ", property);

      const productPrice = {
        product: obj,
        price: undefined,
        inBakery: false
      }
      console.log("productPrice ", productPrice);
      console.log("has ", acc.has(property));
      console.log("get ", acc.get(property));
      
      acc.has(property) ? acc.get(property)?.push(productPrice) : acc.set(property, [productPrice]);
      console.log("res acc", acc);
      
      return acc;
    },this.allProducts!) /////////////можен не быть ! 
    ))
    .subscribe({
      next: (data) => {
        console.log("data:",data);
        
        //this.allProducts = data;  //////////////////////////////////////////////////////
      },
      error: (e) => {
        console.log(e)
      }
    });
  }
  getAllProduct(){
    this.productService.getProducts()
    .pipe(map(item => item.reduce((acc: Map<string, IProductPrice[]>, obj: IProduct) => {
      const property = obj.category!.name;
      const productPrice = {
        product: obj,
        price: undefined,
        inBakery: true
      }
      acc.has(property) ? acc.get(property)?.push(productPrice) : acc.set(property, [productPrice]);
      return acc;
    }, new Map<string, IProductPrice[]>)
    ))
    .subscribe({
      next: (data) => {
        console.log("map",data);
        this.allProducts = data;
        // this.allProductsKey = this.allProducts;
      },
      error: (e) => {
        console.log(e);

      }
    })
  }
  
}
