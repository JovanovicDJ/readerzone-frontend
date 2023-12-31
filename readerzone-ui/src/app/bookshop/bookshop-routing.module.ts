import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { BookComponent } from './components/book/book.component';
import { CartDisplayComponent } from './components/cart-display/cart-display.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
  {
    path: 'book/:isbn',
    component: BookComponent
  },
  {
    path: 'cart',
    component: CartDisplayComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookshopRoutingModule {}
