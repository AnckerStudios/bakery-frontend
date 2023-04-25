import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IIngredient } from 'src/app/model/ingredient';
import { ModalComponent } from 'src/app/model/modal.component';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements ModalComponent, OnInit, OnDestroy {
  @Output() response = new EventEmitter<IIngredient>();
  status?:string;
  mes = '';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private is: IngredientService,
    private fb: FormBuilder,
    public md: ModalDialogService){}

  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    
  })

  ngOnInit() {
    let ingredient = this.md.getInput<IIngredient>();
    ingredient && this.form.setValue({
      id: ingredient.id,
      name: ingredient.name,
    })
    // this.md.inputData
  }
  submit() {
    if(!this.form.valid){
    this.mes = 'Введите название ингредиента'
    return;
  }
  if(this.is.ingredients.find(x=> x.trim().toLowerCase() == this.form.value.name?.trim().toLowerCase())){
    this.mes = 'Ингредиент с таким названием уже существует'
    return;
  }
  this.status = 'loading'
    this.form.valid && this.is.save(this.form.getRawValue() as IIngredient).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.response.emit(data);
      },
      error: (e) => {
        console.error("r err", e);
        this.status = 'error'
      }
    });
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
