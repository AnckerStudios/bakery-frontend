import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { IBakery } from 'src/app/model/bakery';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { AddBakeryComponent } from '../../modal-dialog/add-bakery/add-bakery.component';
import { BakeryService } from 'src/app/services/bakery.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent implements OnDestroy{
  @Input() bakery?:IBakery;
  @Output() change = new EventEmitter<IBakery>();
  @Output() eventDel = new EventEmitter<IBakery>();
  status?:string;
  private readonly destroy$ = new Subject<void>();

  @Input() rounding = false;
  constructor( 
    public md: ModalDialogService,
    private bakeryService: BakeryService){}

  delBakery() : void{
    this.status = 'loading'
    this.bakeryService.deleteBakery(this.bakery!)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
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
    this.md.openDialog<IBakery>(this.bakery,AddBakeryComponent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data)=>{
        this.bakery = data;
      }
    })
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
