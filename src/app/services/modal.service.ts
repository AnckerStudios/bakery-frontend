import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from '../model/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  res?: Subject<any>;

  modalType: Modal = Modal.hide;
  inputData: any;
  open<T>(obj: T | undefined, modal: Modal):Subject<T>{
    let sub = new Subject<T>();
    this.inputData = obj;
    this.modalType = modal;
    this.res = sub;
    return this.res;
  }
  getData<T>() : T | undefined{
    return this.inputData as T
  }
  confirm<T>(obj: T){
    console.log("obj",obj)
    this.res?.next(obj);
    
    // this.res?.unsubscribe(); //?
    this.res?.complete();
  }

  close(){

  }
  public isVisible(): boolean {
    return this.modalType === Modal.hide ? false : true;
  }
}
