import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { IngredientsPageComponent } from './pages/ingredients-page/ingredients-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

const routes: Routes = [
  {path:'', component: MenuPageComponent},
  {path:'product/:id',component: ProductPageComponent},
  {path:'categories',component: CategoryPageComponent},
  {path:'ingredients',component: IngredientsPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
