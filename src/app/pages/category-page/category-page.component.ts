import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddCategoryComponent } from 'src/app/components/modal-dialog/add-category/add-category.component';
import { ICategory } from 'src/app/model/category';
import { FilterCategoryPipe } from 'src/app/pipes/filter-category.pipe';
import { CategoryService } from 'src/app/services/category.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  constructor(private categoryService: CategoryService, private ms: ModalDialogService){}
  
  categories?: ICategory[];
  term='';
  private readonly destroy$ = new Subject<void>();

  status?:string;
  ngOnInit(): void {
    this.getCategories();
  }
  
  getCategories(){
    this.status = undefined;
    this.categoryService.getCategories()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: item => {
        this.categories = item;
        this.categoryService.categories = item.map(x => x.name);
    },error:e=>{
      this.status = 'error';
    }
  });
  }
  delCategory(delItemId: string){
    this.categories = this.categories?.filter((item) => item.id != delItemId);
  }
  addCategory(){
    this.ms.openDialog<ICategory>(undefined,AddCategoryComponent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(data)=>{
        let arr = this.categories;
        arr?.push(data);
        this.categories = new FilterCategoryPipe().transform(arr!,this.term);
      },
      error:e=>{

      }
    })
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
