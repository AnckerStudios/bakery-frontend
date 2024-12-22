import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { IngredientsPageComponent } from './pages/ingredients-page/ingredients-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthPageComponent },
  { path: 'product', component: MenuPageComponent, canActivate: [AuthGuard] },
  { path: 'categories',component: CategoryPageComponent, canActivate: [AuthGuard] },
  { path: 'ingredients',component: IngredientsPageComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/product', pathMatch: 'full'},
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
