import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { IProductPrice } from '../model/productCategories';
import { ICategory } from '../model/category';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(categories: ICategory[], search: string): ICategory[] {
    return categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).sort((x, y) => x.name.toLowerCase().trim().localeCompare(y.name.toLowerCase().trim()));
  }

}
