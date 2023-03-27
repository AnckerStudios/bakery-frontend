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
    this.categoryService.getCategories().subscribe(item => this.categories = item);
  }

  addCategory(){
    this.modalService.setModalType(Modal.addCategory);
  }

}
