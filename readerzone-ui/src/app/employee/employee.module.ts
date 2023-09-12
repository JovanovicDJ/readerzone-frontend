import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AddAuthorDialogComponent } from './components/add-author-dialog/add-author-dialog.component';
import { AddPublisherDialogComponent } from './components/add-publisher-dialog/add-publisher-dialog.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { EditBooksComponent } from './components/edit-books/edit-books.component';
import { RatingModule } from 'primeng/rating';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerDataDialogComponent } from './components/customer-data-dialog/customer-data-dialog.component';
import { CustomerBooksDialogComponent } from './components/customer-books-dialog/customer-books-dialog.component';



@NgModule({
  declarations: [
    EditBookComponent,
    AddBookComponent,
    AddAuthorDialogComponent,
    AddPublisherDialogComponent,
    AddEmployeeComponent,
    EditBooksComponent,
    OrdersComponent,
    OrderComponent,
    CustomerDataDialogComponent,
    CustomerBooksDialogComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectCountryModule,
    RatingModule,
  ]
})
export class EmployeeModule { }
