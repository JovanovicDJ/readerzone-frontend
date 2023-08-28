import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerBooksComponent } from './components/customer-books/customer-books.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';

const routes: Routes = [
  {
    path: 'books',
    component: CustomerBooksComponent
  },
  {
    path: 'profile/:id',
    component: CustomerProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
