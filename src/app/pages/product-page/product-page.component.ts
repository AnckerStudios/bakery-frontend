import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from 'src/app/data/products';
import { IProduct } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  product: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    //const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.productService.getProduct(id)
    //   .subscribe(product => this.product = product);
  }
}
