import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Modal } from '../model/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {

  constructor() { }

  modalType: Modal = Modal.hide;
  public modalResult?: Subject<FormGroup>;

  public getModalType(): Modal {
    return this.modalType;
  }
  public setModalType(modalType: Modal): Subject<FormGroup> {
    this.modalResult = new Subject()
    this.modalType = modalType;
    return this.modalResult;
  }
  public isVisible(): boolean {
    return this.modalType === Modal.hide ? false : true;
  }

  setResult(form: FormGroup) {
    if (this.modalResult) {
      this.modalResult.next(form);
      this.modalResult.complete();
    }
  }


}
