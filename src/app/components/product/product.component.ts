import {Component, Input} from '@angular/core'
import { IProduct } from 'src/app/model/product'
import { IProductBakery } from 'src/app/model/productBakery';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html'
})
export class ProductComponent{
    @Input() productBakery?: IProductBakery;
    image?:string;
    constructor(private productService: ProductService){}
    ngOnInit(){
        const reader = new FileReader();
        reader.onload = () => {
            this.image = reader.result as string;
        };
        this.productService.getImage(this.productBakery?.product?.id as string).subscribe(item => {
            reader.readAsDataURL(new Blob([item]));
            console.log(this.image);
        });
    }
}
