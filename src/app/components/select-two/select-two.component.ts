import { Component, Input } from '@angular/core';
import { IBakery } from 'src/app/model/bakery';
import { Modal } from 'src/app/model/modal';
import { BakeryService } from 'src/app/services/bakery.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-select-two',
  templateUrl: './select-two.component.html',
  styleUrls: ['./select-two.component.css']
})
export class SelectTwoComponent {
  selectBakery?: IBakery;
  isOpen: boolean = false;
  @Input() bakerys : IBakery[] = [];


  constructor(private modalDialog: ModalDialogService, private bakeryService: BakeryService){}

  addBakery() : void {
    this.modalDialog.setModalType(Modal.addBakery);
  }
  delBakery(bakery: IBakery) : void{
    this.modalDialog.setModalType(Modal.delBakery);
  }
  changeBakery(newValue: IBakery) {
    this.selectBakery = newValue;
    this.bakeryService.getCategories(newValue);  
    this.isOpen = false;
  }
  updateBakery(bakery: IBakery){

  }
}
