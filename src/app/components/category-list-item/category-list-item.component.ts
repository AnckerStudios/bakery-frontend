import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICategory } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.css']
})
export class CategoryListItemComponent {
  @Input() category?: ICategory;
  @Output() delCategoryItem = new EventEmitter<string>();
  constructor(private categoryService: CategoryService){}
  ngOnInit(){
    console.log(this.category)
    
  }
  isEdit: boolean = false;
  onEdit(){
    this.isEdit = true;
  }
  delCategory(){
    if(this.category && this.category.id){
      this.categoryService.delete(this.category.id).subscribe(()=> this.delCategoryItem.emit(this.category?.id));
    }
  }
  updateCategory(){
    if(this.category){
      console.log(this.category)
      this.categoryService.update(this.category).subscribe();
      this.isEdit = false;
    }
  }
  changeIsDrink(){
    if(this.category){
      this.category.isDrink = !this.category.isDrink;
    }
  }

}
