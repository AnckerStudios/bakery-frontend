import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {

  constructor() { }

  public isOpen: boolean = false;
}