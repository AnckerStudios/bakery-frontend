import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { IProductPrice } from '../model/productCategories';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(products: KeyValue<string, IProductPrice[]>[], search: string): KeyValue<string, IProductPrice[]>[] {
    return products.reduce<KeyValue<string, IProductPrice[]>[]>((r,e) => {
      let value = e.value.filter(p => p.product.name.toLowerCase().includes(search.toLowerCase()));
      value.length && r.push({
        key: e.key,
        value: value
      });
      return r;
    },[]);
  }

}
