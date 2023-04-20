import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BakeryService } from 'src/app/services/bakery.service';
import { IBakery } from '../../../model/bakery';

@Component({
  selector: 'app-add-bakery',
  templateUrl: './add-bakery.component.html',
  styleUrls: ['./add-bakery.component.css']
})
export class AddBakeryComponent {
  constructor(private bakeryService: BakeryService){}

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required
    ]),
    address: new FormControl<string>('', [
      Validators.required
    ])
  })

  submit() {
    console.log(this.form.value);
this.form.value

    this.bakeryService.createBakery({
      id: undefined,
      address: this.form.value.address as string,
      name: this.form.value.title as string
    }).subscribe();
  }
}
