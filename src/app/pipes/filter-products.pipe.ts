import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../model/product';
import { KeyValue } from '@angular/common';
import { IProductPrice } from '../model/productCategories';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: IProductPrice[], search: string): IProductPrice[] {
    return products.filter(p => p.product.name.toLowerCase().includes(search.toLowerCase()));
      
  }
}
