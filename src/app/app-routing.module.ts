import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { IngredientsPageComponent } from './pages/ingredients-page/ingredients-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {path:'product', component: MenuPageComponent},
  {path:'categories',component: CategoryPageComponent},
  {path:'ingredients',component: IngredientsPageComponent},
  { path: '',   redirectTo: '/product', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
