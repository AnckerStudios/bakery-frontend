import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModelDirective } from 'src/app/model.directive';
import { ModalComponent } from 'src/app/model/modal.component';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit, OnDestroy {
  @ViewChild(ModelDirective) appModel!: ModelDirective;

  private readonly destroy$ = new Subject<void>();

  constructor(public md: ModalDialogService) {}
  ngOnInit(){
    this.md.component$
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data)=>{
        if(data){
        const viewContainerRef = this.appModel.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent<ModalComponent>(data);
        componentRef.instance!.response.subscribe(e => this.confirm(e));
        }
      }
    })
  }
  confirm<T>(data: T) {
    this.md.confirm<T>(data);
  }
  close(){
    this.md.close()
  }

    ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
