import { Component, Input } from '@angular/core';
import { IBakery } from 'src/app/model/bakery';
import { Modal } from 'src/app/model/modal';
import { BakeryService } from 'src/app/services/bakery.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { SelectBakeryService } from 'src/app/services/select-bakery.service';
import { AddBakeryComponent } from '../modal-dialog/add-bakery/add-bakery.component';

@Component({
  selector: 'app-select-two',
  templateUrl: './select-two.component.html',
  styleUrls: ['./select-two.component.css']
})
export class SelectTwoComponent {
  selectBakery?: IBakery;
  isOpen: boolean = false;
  bakerys?: IBakery[];
  status?:string;
  ngOnInit(){
    this.getBakerys();
    let h = new Map
  }
  constructor(private md: ModalDialogService, private bakeryService: BakeryService, private selectBakeryService: SelectBakeryService){}

  addBakery() : void {
    this.md.openDialog<IBakery>(undefined, AddBakeryComponent).subscribe({
      next: (data)=>{
        this.bakerys?.push(data);
      }
    })
    // this.modalDialog.setModalType(Modal.addBakery);
  }
  delBakery(bakery: IBakery) : void{
    console.log("filter",this.bakerys?.filter((item) => item.id != bakery.id));
    
    this.bakerys = this.bakerys?.filter((item) => item.id != bakery.id);
  }
  changeBakery(newValue: IBakery|undefined) {
    this.selectBakeryService.changeBakery(newValue);
    this.selectBakery = newValue; 
    this.isOpen = false;
  }

  getBakerys(): void {
    this.status = undefined;
    this.bakeryService.getBakerys().subscribe({
      next: (data)=>{
        this.bakerys = data;
      },
      error: e=>{
        this.status = 'error'
      }
    })
  }
}
