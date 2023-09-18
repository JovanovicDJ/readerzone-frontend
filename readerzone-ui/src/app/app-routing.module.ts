import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from './shared/guards/customer/customer.guard';
import { EmployeeGuard } from './shared/guards/employee/employee.guard';
import { AuthorProfileComponent } from './shared/components/author-profile/author-profile.component';
import { PublisherProfileComponent } from './shared/components/publisher-profile/publisher-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    loadChildren: () => import('./bookshop/bookshop.module').then((m) => m.BookshopModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'customer',
    canActivateChild: [CustomerGuard],
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule)
  },
  {
    path: 'employee',
    canActivateChild: [EmployeeGuard],
    loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule)
  },
  {
    path: 'home',
    canActivateChild: [CustomerGuard],
    loadChildren: () => import('./homepage/homepage.module').then((m) => m.HomepageModule)
  },
  {
    path: 'author/:id',
    component: AuthorProfileComponent
  },
  {
    path: 'publisher/:id',
    component: PublisherProfileComponent
  },
  { 
    path: '**',
    loadChildren: () => import('./bookshop/bookshop.module').then((m) => m.BookshopModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
