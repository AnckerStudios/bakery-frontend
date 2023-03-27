import { Component } from '@angular/core';
import { IBakery } from './model/bakery';
import { Modal } from './model/modal';
import { ModalDialogService } from './services/modal-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public modalDialog: ModalDialogService){}

  
}
