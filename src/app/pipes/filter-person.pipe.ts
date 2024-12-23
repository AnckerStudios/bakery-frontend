import { Pipe, PipeTransform } from '@angular/core';
import { PersonI } from '../model/person';

@Pipe({
  name: 'filterPerson'
})
export class FilterPersonPipe implements PipeTransform {

  transform(categories: PersonI[], search: string): PersonI[] {
    console.log(categories)
    return categories = categories.filter(c => c.name.includes(search)).sort((x, y) => x.name.toLowerCase().trim().localeCompare(y.name.toLowerCase().trim()));
  }

}
