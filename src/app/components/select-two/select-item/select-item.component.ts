import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBakery } from 'src/app/model/bakery';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { AddBakeryComponent } from '../../modal-dialog/add-bakery/add-bakery.component';
import { BakeryService } from 'src/app/services/bakery.service';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent {
  @Input() bakery?:IBakery;
  @Output() change = new EventEmitter<IBakery>();
  @Output() eventDel = new EventEmitter<IBakery>();
  status?:string;
  constructor( 
    public md: ModalDialogService,
    private bakeryService: BakeryService){}

  delBakery() : void{
    this.status = 'loading'
    this.bakeryService.deleteBakery(this.bakery!).subscribe({
      next: (data)=>{
        this.eventDel.emit(this.bakery)
      },
      error:e=>{
        this.status = 'error'
      }
    });
  }
  changeBakery() {
    this.change.emit(this.bakery)
  }
  editBakery(){
    this.md.openDialog<IBakery>(this.bakery,AddBakeryComponent).subscribe({
      next: (data)=>{
        this.bakery = data;
      }
    })
  }
}
