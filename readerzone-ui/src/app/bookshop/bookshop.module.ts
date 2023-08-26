import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './components/shop/shop.component';
import { BookshopRoutingModule } from './bookshop-routing.module';
import { BookCardComponent } from './components/book-card/book-card.component';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './components/cart/cart.component';
import { SearchFilterCardComponent } from './components/search-filter-card/search-filter-card.component';
import { BookComponent } from './components/book/book.component';
import { CartDisplayComponent } from './components/cart-display/cart-display.component';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    ShopComponent,
    BookCardComponent,
    CartComponent,
    SearchFilterCardComponent,
    BookComponent,
    CartDisplayComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    BookshopRoutingModule,
    SharedModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
  ]
})
export class BookshopModule { }
