import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditBooksComponent } from './components/edit-books/edit-books.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminGuard } from '../shared/guards/admin/admin.guard';

const routes: Routes = [
    {
      path: '',
      component: EditBooksComponent
    },
    {
      path: 'orders',
      component: OrdersComponent
    },
    {
      path: 'edit/:isbn',
      component: EditBookComponent
    },
    {
      path: 'add-book',
      component: AddBookComponent
    },
    {
      path: 'add-employee',
      canActivate: [AdminGuard],
      component: AddEmployeeComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
