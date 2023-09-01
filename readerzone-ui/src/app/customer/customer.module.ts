import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerBooksComponent } from './components/customer-books/customer-books.component';
import { CustomerBookComponent } from './components/customer-book/customer-book.component';
import { RatingModule } from 'primeng/rating';
import { CustomerBooksHeaderComponent } from './components/customer-books-header/customer-books-header.component';
import { ReviewDialogComponent } from './components/review-dialog/review-dialog.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CustomerTierComponent } from './components/customer-tier/customer-tier.component';
import { CustomerEditDialogComponent } from './components/customer-edit-dialog/customer-edit-dialog.component';
import { NotificationsComponent } from './components/notifications/notifications.component';



@NgModule({
  declarations: [
    CustomerBooksComponent,
    CustomerBookComponent,
    CustomerBooksHeaderComponent,
    ReviewDialogComponent,
    CustomerProfileComponent,
    CustomerTierComponent,
    CustomerEditDialogComponent,
    NotificationsComponent
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
