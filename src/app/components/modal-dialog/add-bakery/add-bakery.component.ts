import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BakeryService } from 'src/app/services/bakery.service';
import { IBakery } from '../../../model/bakery';
import { IProductPrice } from 'src/app/model/productCategories';
import { ModalComponent } from 'src/app/model/modal.component';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-add-bakery',
  templateUrl: './add-bakery.component.html',
  styleUrls: ['./add-bakery.component.css']
})
export class AddBakeryComponent implements ModalComponent {
  @Output() response = new EventEmitter<IBakery>();
  status?:string;
  constructor(
    private bakeryService: BakeryService,
    private fb: FormBuilder,
    public md: ModalDialogService){}

  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    address: ['', [Validators.required]]
  })

  ngOnInit() {
    let bakery = this.md.getInput<IBakery>();
    bakery && this.form.setValue({
      id: bakery.id,
      name: bakery.name,
      address: bakery.address

    })
    // this.md.inputData
  }
  submit() {
    this.status = 'loading'
    this.form.valid && this.bakeryService.saveBakery(this.form.getRawValue() as IBakery).subscribe({
      next: (data) => {
        this.response.emit(data);
      },
      error: (e) => {
        console.error("r err", e);
        this.status = 'error'
      }
    });
  }
}
