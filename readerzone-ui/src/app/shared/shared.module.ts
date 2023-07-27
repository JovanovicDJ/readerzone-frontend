import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';



@NgModule({
  declarations: [
    NavbarComponent,
    CategoriesListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    NavbarComponent,
    CategoriesListComponent
  ]
})
export class SharedModule { }
