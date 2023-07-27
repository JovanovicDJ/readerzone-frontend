import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
  {
    path: 'book',
    component: BookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookshopRoutingModule {}
