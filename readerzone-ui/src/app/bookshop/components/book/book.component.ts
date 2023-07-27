import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/model/Book';
import { BookService } from 'src/app/shared/services/book-service/book.service';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book!: Book;

  constructor(private bookService: BookService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.book = this.bookService.getBook()
  }

}
