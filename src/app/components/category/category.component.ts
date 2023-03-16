import { Component, Input } from '@angular/core';
import { IProductCategories } from 'src/app/model/productCategories';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() productCategory?: IProductCategories;
  constructor(public model : ModalDialogService){}
}