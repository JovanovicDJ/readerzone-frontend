import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCardComponent } from './bookshop/components/book-card/book-card.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    loadChildren: () => import('./bookshop/bookshop.module').then((m) => m.BookshopModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
