import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-select-bakery',
  templateUrl: './select-bakery.component.html',
  styleUrls: ['./select-bakery.component.css']
})
export class SelectBakeryComponent {

  constructor(private productService: ProductService, private fb: FormBuilder) {}
  selectFile?: File;
  imagePreview?: string;
  // form = new FormGroup({
  //   id: new FormControl<string>('', [
  //     Validators.required
  //   ]),
  //   name: new FormControl<string>('', [
  //     Validators.required
  //   ]),
  //   image: new FormControl(null,[
  //     Validators.required
  //   ])
  // });
  form: FormGroup = this.fb.group({
    name:[''],
    image:[null]
  })
  onImagePicked(event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    this.selectFile = file; 
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSave(){
    let formData = new FormData();
    formData.append("product",this.form.get('name')?.value);
    formData.append("image",this.form.get('image')?.value);
    console.log("file"+this.selectFile);
    this.productService.createProduct(this.selectFile as File).subscribe(t => console.log("Ответ "+t));
  }
  
}
