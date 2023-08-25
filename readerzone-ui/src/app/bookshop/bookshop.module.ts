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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopComponent,
    BookCardComponent,
    CartComponent,
    SearchFilterCardComponent,
    BookComponent,
    CartDisplayComponent
  ],
  imports: [
    CommonModule,
    BookshopRoutingModule,
    SharedModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BookshopModule { }
