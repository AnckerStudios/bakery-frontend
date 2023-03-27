import { Component } from '@angular/core';
import { ICategory } from 'src/app/model/category';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent {
  isOpen: boolean = false;
  selectCategory?: ICategory;
  title : string = 'Выберите категорию';
}
