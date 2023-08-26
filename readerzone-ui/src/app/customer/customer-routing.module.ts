import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerBooksComponent } from './components/customer-books/customer-books.component';

const routes: Routes = [
  {
    path: 'books',
    component: CustomerBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
