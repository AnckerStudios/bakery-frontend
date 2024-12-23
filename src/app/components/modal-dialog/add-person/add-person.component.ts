import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalComponent } from 'src/app/model/modal.component';
import { PersonI } from 'src/app/model/person';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements ModalComponent, OnInit, OnDestroy {
  @Output() response = new EventEmitter<PersonI>();
  status?:string;
  mes = '';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private is: PersonService,
    private fb: FormBuilder,
    public md: ModalDialogService){}

  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  })

  ngOnInit() {
    let person = this.md.getInput<PersonI>();
    person && this.form.setValue({
      id: person.id,
      name: person.name,
      description: person.description
    })
    // this.md.inputData
  }
  submit() {
    if(!this.form.valid){
    this.mes = 'Введите название ингредиента'
    return;
  }
  if(this.is.persons.find(x=> x.trim().toLowerCase() == this.form.value.name?.trim().toLowerCase())){
    this.mes = 'Ингредиент с таким названием уже существует'
    return;
  }
  this.status = 'loading'
    this.form.valid && this.is.save(this.form.getRawValue() as PersonI).pipe(
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
