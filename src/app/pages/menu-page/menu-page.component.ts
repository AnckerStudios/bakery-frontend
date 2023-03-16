import { Component } from '@angular/core';
import { products } from 'src/app/data/products';
import { IBakery } from 'src/app/model/bakery';
import { IProduct } from 'src/app/model/product';
import { IProductCategories } from 'src/app/model/productCategories';
import { BakeryService } from 'src/app/services/bakery.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent {
  constructor(public bakeryService: BakeryService) { }



}
