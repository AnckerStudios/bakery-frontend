import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBakery } from 'src/app/model/bakery';
import { BakeryService } from 'src/app/services/bakery.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { SelectBakeryService } from 'src/app/services/select-bakery.service';
import { AddBakeryComponent } from '../modal-dialog/add-bakery/add-bakery.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-two',
  templateUrl: './select-two.component.html',
  styleUrls: ['./select-two.component.css']
})
export class SelectTwoComponent implements OnInit, OnDestroy {
  selectBakery?: IBakery;
  isOpen: boolean = false;
  bakerys?: IBakery[];
  status?:string;
  private readonly destroy$ = new Subject<void>();

  ngOnInit(){
    this.getBakerys();
    this.selectBakery = this.selectBakeryService.bakery.getValue();
  }
  constructor(private md: ModalDialogService, private bakeryService: BakeryService, private selectBakeryService: SelectBakeryService){}

  addBakery() : void {
    this.md.openDialog<IBakery>(undefined, AddBakeryComponent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data)=>{
        this.bakerys?.push(data);
      }
    })
  }
  delBakery(bakery: IBakery) : void{
    this.bakerys = this.bakerys?.filter((item) => item.id != bakery.id);
  }
  changeBakery(newValue: IBakery|undefined) {
    this.selectBakeryService.changeBakery(newValue);
    this.selectBakery = newValue; 
    this.isOpen = false;
  }

  getBakerys(): void {
    this.status = undefined;
    this.bakeryService.getBakerys()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data)=>{
        this.bakerys = data;
        this.bakeryService.bakerys = data.map(x=>x.name);
      },
      error: e=>{
        this.status = 'error'
      }
    })
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
