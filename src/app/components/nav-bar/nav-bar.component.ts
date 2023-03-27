import { Component, Input } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { IBakery } from 'src/app/model/bakery';
import { BakeryService } from 'src/app/services/bakery.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  selectBakery?: IBakery | string ;
  bakerys: IBakery[] = [{
    id: "string",
    name: "string",
    address: "string"
  },{
    id: "string2",
    name: "string2",
    address: "string2"
  }];
  constructor(public bakeryService: BakeryService, public modalDialog : ModalDialogService) { }
  ngOnInit(): void {
    this.getBakerys();
  }

  getBakerys(): void {
    this.bakeryService.getBakerys().subscribe(bakerys => this.bakerys = bakerys)
  }
  
}
