import { Component, Input } from '@angular/core';
import { IBakery } from 'src/app/model/bakery';
import { Modal } from 'src/app/model/modal';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  selectBakery?: IBakery;
  isOpen: boolean = false;
  @Input() items : IBakery[] = [];
  @Input() title : string = '';


  constructor(private modalDialog: ModalDialogService){}

  addBakery() : void {
    // this.modalDialog.setModalType(Modal.addBakery);
  }
  delBakery(bakery: IBakery) : void{
    // this.modalDialog.setModalType(Modal.delBakery);
  }
  changeBakery(newValue: IBakery) {
    this.selectBakery = newValue;
    //this.bakeryService.getCategories(newValue);  
  }
}
