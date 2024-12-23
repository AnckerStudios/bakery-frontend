import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddPersonComponent } from 'src/app/components/modal-dialog/add-person/add-person.component';
import { PersonI } from 'src/app/model/person';
import { FilterPersonPipe } from 'src/app/pipes/filter-person.pipe';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css']
})
export class PersonPageComponent implements OnInit, OnDestroy {
constructor(private personService: PersonService, private ms: ModalDialogService) { }
  private readonly destroy$ = new Subject<void>();

  persons?: PersonI[];
  term = '';
  status?: string
  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.status = undefined;
    this.personService.get()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: item => {
        this.persons = item;
        this.personService.persons = item.map(x=>x.name);
      },
      error: e => {
        this.status = 'error';
      }
    });
  }
  del(delItemId: string) {
    this.persons = this.persons?.filter((item) => item.id != delItemId);
  }
  add() {
    this.ms.openDialog<PersonI>(undefined, AddPersonComponent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        let arr = this.persons;
        arr?.push(data);
        this.persons = new FilterPersonPipe().transform(arr!,this.term);
      }
    })
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
