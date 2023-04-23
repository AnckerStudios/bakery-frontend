import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/model/category';
import { ModalComponent } from 'src/app/model/modal.component';
import { CategoryService } from 'src/app/services/category.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements ModalComponent {
  @Output() response = new EventEmitter<ICategory>();
  status?:string;
  constructor(
    private categoruService: CategoryService,
    private fb: FormBuilder,
    public md: ModalDialogService){}

  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    isDrink: [false, [Validators.required]]
  })

  ngOnInit() {
    let category = this.md.getInput<ICategory>();
    category && this.form.setValue({
      id: category.id,
      name: category.name,
      isDrink: category.isDrink

    })
    // this.md.inputData
  }
  submit() {
    this.status = 'loading'
    this.form.valid && this.categoruService.save(this.form.getRawValue() as ICategory).subscribe({
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
