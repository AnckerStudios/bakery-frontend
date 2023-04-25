import { Pipe, PipeTransform } from '@angular/core';
import { IIngredient } from '../model/ingredient';

@Pipe({
  name: 'filterIngredient'
})
export class FilterIngredientPipe implements PipeTransform {

  transform(categories: IIngredient[], search: string): IIngredient[] {
    console.log(categories)
    return categories = categories.filter(c => c.name.includes(search)).sort((x, y) => x.name.toLowerCase().trim().localeCompare(y.name.toLowerCase().trim()));
  }

}
