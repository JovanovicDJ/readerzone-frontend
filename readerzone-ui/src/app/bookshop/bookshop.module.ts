import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './components/shop/shop.component';
import { BookshopRoutingModule } from './bookshop-routing.module';
import { BookCardComponent } from './components/book-card/book-card.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ShopComponent,
    BookCardComponent
  ],
  imports: [
    CommonModule,
    BookshopRoutingModule,
    SharedModule
  ]
})
export class BookshopModule { }
