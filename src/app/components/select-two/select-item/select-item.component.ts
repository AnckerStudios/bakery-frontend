import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBakery } from 'src/app/model/bakery';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent {
  @Input() bakery?:IBakery;
  @Output() change = new EventEmitter<IBakery>();
  isEdit = false;
  delBakery() : void{
    //this.modalDialog.setModalType(Modal.delBakery);
  }
  changeBakery() {
    this.change.emit(this.bakery)
    //this.selectBakery = newValue;
    //this.bakeryService.getCategories(newValue);  
  }
  updateBakery(){
    this.isEdit=true;
  }
}
