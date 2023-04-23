import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICategory } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { AddCategoryComponent } from '../modal-dialog/add-category/add-category.component';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.css']
})
export class CategoryListItemComponent {
  @Input() category?: ICategory;
  @Output() delCategoryItem = new EventEmitter<string>();
  status?:string;
  constructor(
    private categoryService: CategoryService,
    public ms: ModalDialogService
    ){}
  ngOnInit(){
    console.log(this.category)
    
  }
 
 
  del(){
    this.status = 'loading';
    this.categoryService.delete(this.category!).subscribe({
      next: ()=> {
        this.delCategoryItem.emit(this.category?.id)
      },
      error: e=>{
        this.status = 'error'
      }
    });

  }
  edit(){
    this.ms.openDialog<ICategory>(this.category,AddCategoryComponent).subscribe({
      next:(data)=>{
        this.category = data;
      }
    })
  }
 

}
