import { Component } from '@angular/core';
import { BakeryService } from 'src/app/services/bakery.service';

@Component({
  selector: 'app-del-bakery',
  templateUrl: './del-bakery.component.html',
  styleUrls: ['./del-bakery.component.css']
})
export class DelBakeryComponent {
  constructor(private bakeryService: BakeryService){}
  clickYes():void {
    
  }
  clickNo():void{

  }
}
