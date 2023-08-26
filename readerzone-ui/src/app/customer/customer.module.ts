import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerBooksComponent } from './components/customer-books/customer-books.component';
import { CustomerBookComponent } from './components/customer-book/customer-book.component';
import { RatingModule } from 'primeng/rating';
import { CustomerBooksHeaderComponent } from './components/customer-books-header/customer-books-header.component';



@NgModule({
  declarations: [
    CustomerBooksComponent,
    CustomerBookComponent,
    CustomerBooksHeaderComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
  ]
})
export class CustomerModule { }
