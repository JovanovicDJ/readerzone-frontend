import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageProbaComponent } from './shared/components/image-proba/image-proba.component';

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
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule)
  },
  {
    path: 'image',
    component: ImageProbaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
