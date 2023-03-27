import { Injectable } from '@angular/core';
import { Modal } from '../model/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {

  constructor() { }

  modalType: Modal = Modal.hide;

  public getModalType():Modal{
    return this.modalType;
  }
  public setModalType(modalType: Modal) : void {
    this.modalType = modalType;
  }
  public isVisible():boolean {
    return this.modalType === Modal.hide ? false : true;
  }
}
