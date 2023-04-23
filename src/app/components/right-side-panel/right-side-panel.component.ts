import { Component } from '@angular/core';
import { Modal } from 'src/app/model/modal';
import { IProductBakery } from 'src/app/model/productBakery';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { SaveProductComponent } from '../modal-dialog/save-product/save-product.component';

@Component({
  selector: 'app-right-side-panel',
  templateUrl: './right-side-panel.component.html',
  styleUrls: ['./right-side-panel.component.css']
})
export class RightSidePanelComponent {
  constructor(private modalService : ModalDialogService){}

  addProduct(){
    this.modalService.openDialog<IProductBakery>(undefined, SaveProductComponent).subscribe();
  }
}
