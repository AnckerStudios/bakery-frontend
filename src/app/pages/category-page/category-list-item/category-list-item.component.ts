import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ICategory } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { AddCategoryComponent } from '../../../components/modal-dialog/add-category/add-category.component';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.css']
})
export class CategoryListItemComponent implements  OnDestroy {
  @Input() category?: ICategory;
  @Output() delCategoryItem = new EventEmitter<string>();
  status?:string;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    public ms: ModalDialogService
    ){}
 
 
  del(){
    this.status = 'loading';
    this.categoryService.delete(this.category!)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: ()=> {
        this.delCategoryItem.emit(this.category?.id)
      },
      error: e=>{
        this.status = 'error'
      }
    });

  }
  edit(){
    this.ms.openDialog<ICategory>(this.category,AddCategoryComponent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(data)=>{
        this.category = data;
      }
    })
  }
 
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
