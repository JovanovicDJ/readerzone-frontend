import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageComponent } from './services/message-service/message.service';


@NgModule({
  declarations: [
    NavbarComponent,
    CategoriesListComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,    
  ],
  exports: [
    MaterialModule,
    NavbarComponent,
    CategoriesListComponent    
  ]
})
export class SharedModule { }
