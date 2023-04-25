import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddIngredientComponent } from 'src/app/components/modal-dialog/add-ingredient/add-ingredient.component';
import { IIngredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css']
})
export class IngredientItemComponent implements OnDestroy {
  @Input() ingredient?: IIngredient;
  @Output() eventDel = new EventEmitter<string>();
  status?:string;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private ingredientService: IngredientService,
    public ms: ModalDialogService
    ){}

 
 
  del(){
    this.status = 'loading';
    this.ingredientService.delete(this.ingredient!)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: ()=> {
        this.eventDel.emit(this.ingredient?.id)
      },
      error: e=>{
        this.status = 'error'
      }
    });

  }
  edit(){
    this.ms.openDialog<IIngredient>(this.ingredient,AddIngredientComponent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(data)=>{
        this.ingredient = data;
      }
    })
  }
 
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
