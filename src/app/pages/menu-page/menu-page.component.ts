import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { products } from 'src/app/data/products';
import { IBakery } from 'src/app/model/bakery';
import { ICategory } from 'src/app/model/category';
import { IProduct } from 'src/app/model/product';
import { IProductBakery } from 'src/app/model/productBakery';
import { IProductCategories } from 'src/app/model/productCategories';
import { BakeryService } from 'src/app/services/bakery.service';
import { ProductService } from 'src/app/services/product.service';
import { SelectBakeryService } from 'src/app/services/select-bakery.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent {
  isAddProduct = false;
  allProducts?: IProduct[];
  mapProduct = new Map<string,IProduct[]>();
  bakeryProducts?: IProductCategories[];
  notBakeryProduct?: IProduct[];
  constructor(
    public bakeryService: BakeryService,
    public selectBakeryS: SelectBakeryService,
    private productService: ProductService
    ) { }
  
  ngOnInit(){
    this.selectBakeryS.bakery.subscribe({
      next: (data) => {
        console.log(data);
        data ? this.getBakeryProducts(data) : this.bakeryProducts=undefined;
      }
    });
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log(data);
        for(let item of data){
          if(this.mapProduct.has(item.category!.id!)){
            console.log('yes')

            this.mapProduct.get(item.category!.id!)?.push(item);
          }else{
            console.log('no')
            this.mapProduct.set(item.category!.id!,[item])
          }
          
        }

        this.allProducts = data;
      },
      error: (e) => {
        console.log(e);

      }
    })
  }

  getBakeryProducts(bakery: IBakery){
    this.selectBakeryS.getCategories(bakery).subscribe({
      next:(data) =>{
        console.log(data);
        this.bakeryProducts = data;
      },
      error: (e)=>{

      }
    });
  }
}
