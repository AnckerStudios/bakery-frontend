import { Component } from '@angular/core';
import { AddCategoryComponent } from 'src/app/components/modal-dialog/add-category/add-category.component';
import { AddIngredientComponent } from 'src/app/components/modal-dialog/add-ingredient/add-ingredient.component';
import { ICategory } from 'src/app/model/category';
import { IIngredient } from 'src/app/model/ingredient';
import { Modal } from 'src/app/model/modal';
import { CategoryService } from 'src/app/services/category.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent {
  constructor(private categoryService: CategoryService, private ms: ModalDialogService){}
  
  categories?: ICategory[];

  ngOnInit(): void {
    this.getCategories();
  }
  
  getCategories(){
    this.categoryService.getCategories().subscribe(item => {this.categories = item;
    console.log(this.categories)});
  }
  delCategory(delItemId: string){
    this.categories = this.categories?.filter((item) => item.id != delItemId);
  }
  addCategory(){
    this.ms.openDialog<ICategory>(undefined,AddCategoryComponent).subscribe({
      next:(data)=>{
        this.categories?.push(data);
      },
      error:e=>{

      }
    })
  }

}
