import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/model/category';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.css']
})
export class CategoryListItemComponent {
  @Input() category?: ICategory;

  ngOnInit(){

  }
  isEdit: boolean = false;
  onEdit(){
    this.isEdit = true;
  }
  delCategory(){

  }
  updateCategory(){
    this.isEdit = false;
  }
  changeIsDrink(){
    this.category?.isDrink = false;
  }
}
