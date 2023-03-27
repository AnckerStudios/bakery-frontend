import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.css']
})
export class FirstStepComponent {

  constructor(private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    name:[''],
    image:[null]
  })

  productName: string = '';
  imagePreview?: string;
  selectFile?: File;
  public onFileChanged(event: Event) {
    //Select File
    
  }

  onImagePicked(event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    this.selectFile = file; 
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    console.log(file.name)
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
