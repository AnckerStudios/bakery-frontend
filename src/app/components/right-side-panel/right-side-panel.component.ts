import { Component } from '@angular/core';
import { Modal } from 'src/app/model/modal';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-right-side-panel',
  templateUrl: './right-side-panel.component.html',
  styleUrls: ['./right-side-panel.component.css']
})
export class RightSidePanelComponent {
  constructor(private modalService : ModalDialogService){}

  addProduct(){
    this.modalService.setModalType(Modal.addProduct);
  }
}
