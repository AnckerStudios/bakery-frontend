import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { SelectComponent } from './components/select/select.component';
import { AddBakeryComponent } from './components/modal-dialog/add-bakery/add-bakery.component';
import { AddProductComponent } from './components/modal-dialog/add-product/add-product.component';
import { DelBakeryComponent } from './components/modal-dialog/del-bakery/del-bakery.component';
import { RightSidePanelComponent } from './components/right-side-panel/right-side-panel.component';
import { SelectTwoComponent } from './components/select-two/select-two.component';
import { AddIngredientsComponent } from './components/modal-dialog/add-product/add-ingredients/add-ingredients.component';
import { SelectBakeryComponent } from './components/modal-dialog/add-product/select-bakery/select-bakery.component';
import { FirstStepComponent } from './components/modal-dialog/add-product/first-step/first-step.component';
import { SelectCategoryComponent } from './components/modal-dialog/add-product/select-category/select-category.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { SecondStepComponent } from './components/modal-dialog/add-product/second-step/second-step.component';
import { AddCategoryComponent } from './components/modal-dialog/add-category/add-category.component';
import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductPageComponent,
    MenuPageComponent,
    NavBarComponent,
    MenuComponent,
    CategoryComponent,
    ModalDialogComponent,
    SelectComponent,
    AddBakeryComponent,
    AddProductComponent,
    DelBakeryComponent,
    RightSidePanelComponent,
    SelectTwoComponent,
    AddIngredientsComponent,
    SelectBakeryComponent,
    FirstStepComponent,
    SelectCategoryComponent,
    CategoryPageComponent,
    SecondStepComponent,
    AddCategoryComponent,
    CategoryListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
