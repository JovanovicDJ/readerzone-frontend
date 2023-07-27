import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/model/Book';
import { BookService } from 'src/app/shared/services/book-service/book.service';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input()
  book!: Book;

  buttonClicked: boolean = false;

  constructor(private bookService: BookService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
  
  }

  onBookClick() {
    this.bookService.setBook(this.book);
    this.router.navigate(['/shop/book']);
  }

  addToCart() {
    this.buttonClicked = true;
    this.cartService.addToCart(this.book);
  }

}
