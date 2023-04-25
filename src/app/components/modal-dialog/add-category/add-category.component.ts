import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ICategory } from 'src/app/model/category';
import { ModalComponent } from 'src/app/model/modal.component';
import { CategoryService } from 'src/app/services/category.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements ModalComponent, OnInit, OnDestroy {
  @Output() response = new EventEmitter<ICategory>();
  status?:string;
  mes='';
  private readonly destroy$ = new Subject<void>();

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
  }
  changeDrink(){
    this.form.patchValue({
      isDrink: !this.form.value.isDrink
    })
  }
  submit() {
    if(!this.form.valid){
      this.mes = 'Введите название категории'
      return;
    }
    if(this.categoruService.categories.find(x=> x.trim().toLowerCase() == this.form.value.name?.trim().toLowerCase())){
      this.mes = 'Категория с таким названием уже существует'
      return;
    }
    this.status = 'loading'
    this.categoruService.save(this.form.getRawValue() as ICategory)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => { this.response.emit(data) },
      error: (e) => { this.status = 'error' }
    });
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
