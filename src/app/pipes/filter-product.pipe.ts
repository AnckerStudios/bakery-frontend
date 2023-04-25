import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { IProductPrice } from '../model/productCategories';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(products: Map<string, IProductPrice[]>, search: string): Map<string, IProductPrice[]> {
    let map = new Map<string, IProductPrice[]>();
    for(let t of products.entries()){
      let k = t[1].filter(p => p.product.name.toLowerCase().includes(search.toLowerCase())).sort((x, y) => x.product.name.toLowerCase().trim().localeCompare(y.product.name.toLowerCase().trim()));
      k.length && map.set( t[0],k)
    }
    return map;
    // return products.reduce<KeyValue<string, IProductPrice[]>[]>((r,e) => {
    //   let value = e.value.filter(p => p.product.name.toLowerCase().includes(search.toLowerCase())).sort((x, y) => x.product.name.toLowerCase().trim().localeCompare(y.product.name.toLowerCase().trim()));
    //   value.length && r.push({
    //     key: e.key,
    //     value: value
    //   });
    //   return r;
    // },[]);
  }

}
