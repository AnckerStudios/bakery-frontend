import { Component, Input } from '@angular/core';
import { IBakery } from 'src/app/model/bakery';
import { Modal } from 'src/app/model/modal';
import { BakeryService } from 'src/app/services/bakery.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { SelectBakeryService } from 'src/app/services/select-bakery.service';

@Component({
  selector: 'app-select-two',
  templateUrl: './select-two.component.html',
  styleUrls: ['./select-two.component.css']
})
export class SelectTwoComponent {
  selectBakery?: IBakery;
  isOpen: boolean = false;
  bakerys : IBakery[] = [];

  ngOnInit(){
    this.getBakerys();
    let h = new Map
  }
  constructor(private modalDialog: ModalDialogService, private bakeryService: BakeryService, private selectBakeryService: SelectBakeryService){}

  addBakery() : void {
    // this.modalDialog.setModalType(Modal.addBakery);
  }
  delBakery(bakery: IBakery) : void{
    // this.modalDialog.setModalType(Modal.delBakery);
  }
  changeBakery(newValue: IBakery|undefined) {
    this.selectBakeryService.changeBakery(newValue);
    this.selectBakery = newValue;
    // this.bakeryService.getCategories(newValue);  
    this.isOpen = false;
  }
  updateBakery(bakery: IBakery){

  }
  getBakerys(): void {
    this.bakeryService.getBakerys().subscribe(bakerys => this.bakerys = bakerys)
  }
}
