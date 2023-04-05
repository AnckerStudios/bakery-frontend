import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BakeryService } from 'src/app/services/bakery.service';

@Component({
  selector: 'app-del-bakery',
  templateUrl: './del-bakery.component.html',
  styleUrls: ['./del-bakery.component.css']
})
export class DelBakeryComponent {
  constructor(private bakeryService: BakeryService){}
  @Output() response = new EventEmitter<FormGroup>();

  clickYes():void {
    this.response.emit();
  }
  clickNo():void{
    this.response.emit();
  }
}
