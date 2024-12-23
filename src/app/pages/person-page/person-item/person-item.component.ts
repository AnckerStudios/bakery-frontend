import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddPersonComponent } from 'src/app/components/modal-dialog/add-person/add-person.component';
import { PersonI } from 'src/app/model/person';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent implements OnDestroy {
  @Input() person?: PersonI;
  @Output() eventDel = new EventEmitter<string>();
  status?:string;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private personService: PersonService,
    public ms: ModalDialogService
    ){}

 
 
  del(){
    this.status = 'loading';
    this.personService.delete(this.person!)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: ()=> {
        this.eventDel.emit(this.person?.id)
      },
      error: e=>{
        this.status = 'error'
      }
    });

  }
  edit(){
    this.ms.openDialog<PersonI>(this.person,AddPersonComponent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(data)=>{
        this.person = data;
      }
    })
  }
 
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
