import { Injectable, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Modal } from '../model/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  public component$ = new Subject<any>();
  inputData: any;
  res?: Subject<any>;
  constructor() { }

  getInput<T>(): T{
    return this.inputData as T;
  }
  openDialog<T>(obj: T | undefined,type: Type<any>): Subject<T>{
    this.inputData = obj;
    this.component$.next(type);
    return this.res = new Subject<T>();
  }
  confirm<T>(obj: T){
    this.res?.next(obj);
    this.close();
  }
  close(){
    this.component$.next(undefined)
    this.res?.complete;
  }
}
