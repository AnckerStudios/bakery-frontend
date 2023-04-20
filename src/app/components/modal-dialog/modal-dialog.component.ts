import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModelDirective } from 'src/app/model.directive';
import { Modal } from 'src/app/model/modal';
import { ModalComponent } from 'src/app/model/modal.component';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {
  Modal = Modal;
  @ViewChild(ModelDirective) appModel!: ModelDirective;


  constructor(public md: ModalDialogService) {}
  ngOnInit(){
    console.log("AAAAAAAAA",this.appModel);
    this.md.component$.subscribe({
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
    console.log("modal global",data);
  }
  close(){
    this.md.close()
  }

  
}
