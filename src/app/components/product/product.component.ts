import {Component, EventEmitter, Input, Output} from '@angular/core'
import { IProduct } from 'src/app/model/product'
import { IProductBakery } from 'src/app/model/productBakery';
import { IProductPrice } from 'src/app/model/productCategories';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { ProductService } from 'src/app/services/product.service';
import { SaveProductComponent } from '../modal-dialog/save-product/save-product.component';
import { SelectBakeryService } from 'src/app/services/select-bakery.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html'
})
export class ProductComponent{
    @Input() productPrice?: IProductPrice;
    @Output() eventDelete = new EventEmitter<IProduct>();
    @Output() eventEdit = new EventEmitter<IProductPrice>();
    constructor(
        private productService: ProductService,
        private md: ModalDialogService,
        private selectBakeryS: SelectBakeryService
        ){}
    ngOnInit(){
       
        
    }
    onDelete(){
        if(this.selectBakeryS.bakery.getValue()){
            this.selectBakeryS.delProductBakery(this.selectBakeryS.bakery.getValue()!,this.productPrice?.product!).subscribe({
              next: (data)=>{
                this.productPrice!.inBakery = false;
                this.productPrice!.price = undefined;
                this.eventDelete.emit(this.productPrice?.product)
              },
              error: e=>{
                console.log(e);
              }
            })
          }else{
            this.productService.deleteProduct(this.productPrice?.product!).subscribe({
              next: (data)=>{
                this.eventDelete.emit(this.productPrice?.product)
              },
              error: e=>{
                console.log(e);
              }
            })
          }
    }
    onEdit(){
        
        this.md.openDialog<IProductPrice>(this.productPrice, SaveProductComponent).subscribe({
            next: (data)=>{
                this.productPrice = data;
                this.eventEdit.emit(this.productPrice)
            }
        })
    }
}
