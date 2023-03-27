import { Component, Input } from '@angular/core';
import { Modal } from 'src/app/model/modal';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {
  constructor(public modalDialog: ModalDialogService){}
  Modal = Modal;

  close():void{
    this.modalDialog.setModalType(Modal.hide);
  }

  
}
