import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddIngredientComponent } from 'src/app/components/modal-dialog/add-ingredient/add-ingredient.component';
import { IIngredient } from 'src/app/model/ingredient';
import { FilterIngredientPipe } from 'src/app/pipes/filter-ingredient.pipe';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';


@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.css']
})
export class IngredientsPageComponent implements OnInit, OnDestroy {
  constructor(private ingredientService: IngredientService, private ms: ModalDialogService) { }
  private readonly destroy$ = new Subject<void>();

  ingredients?: IIngredient[];
  term = '';
  status?: string
  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients() {
    this.status = undefined;
    this.ingredientService.getIngredients()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: item => {
        this.ingredients = item;
        this.ingredientService.ingredients = item.map(x=>x.name);
      },
      error: e => {
        this.status = 'error';
      }
    });
  }
  del(delItemId: string) {
    this.ingredients = this.ingredients?.filter((item) => item.id != delItemId);
  }
  add() {
    this.ms.openDialog<IIngredient>(undefined, AddIngredientComponent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        let arr = this.ingredients;
        arr?.push(data);
        this.ingredients = new FilterIngredientPipe().transform(arr!,this.term);
      }
    })
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
