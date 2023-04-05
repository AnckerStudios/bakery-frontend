import { Component } from '@angular/core';
import { ICategory } from 'src/app/model/category';
import { Modal } from 'src/app/model/modal';
import { CategoryService } from 'src/app/services/category.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent {
  constructor(private categoryService: CategoryService, private modalService: ModalDialogService){}
  
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
    this.modalService.setModalType(Modal.addCategory).subscribe(form => {
      console.log("Я пытаюсь добавьть ", form)
      this.categoryService.create({
          isDrink: form.value.isDrink,
          name: form.value.name
        }).subscribe(item => {
          console.log(item);
          this.categories?.push(item);
        });
    });
  }

}
