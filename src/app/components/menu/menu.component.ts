import { Component, Input } from '@angular/core';
import { IProductCategories } from 'src/app/model/productCategories';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() productCategories?: IProductCategories[];
}
