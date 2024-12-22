import { Component } from '@angular/core';
import { ModalDialogService } from './services/modal-dialog.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public modalDialog: ModalDialogService, public authService: AuthService){}
}
