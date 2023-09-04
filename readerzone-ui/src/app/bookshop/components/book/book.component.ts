import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Book } from 'src/app/shared/model/Book';
import { BookService } from 'src/app/shared/services/book-service/book.service';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book!: Book;

  buttonClicked: boolean = false;
  isbn: string = '';

  books: Book[] = [];

  constructor(private bookService: BookService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private router: Router) { }  

  get authorNames(): string {
    var fullnames: string[] = [];
    for (let author of this.book.authors) {
      fullnames.push(author.name + ' ' + author.surname);
    }
    return fullnames.join(' ,');
  }

  get publishingDate(): string {
    const dateTimeString = this.book.publishingDate;
    const parsedDate = moment(dateTimeString);
    return parsedDate.format('DD.MM.YYYY.');
  }

  get discountPrice(): number {
    var discount = this.book.price * this.book.discount / 100;
    return this.book.price - discount;
  }

  ngOnInit(): void {    
    let isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn !== null) {
      this.bookService
        .getBookByIsbn(isbn)
        .subscribe({
          next: (res: Book) => {
            this.book = res;
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          }
        });
      this.bookService
        .getRecommendedBooks()
        .subscribe({
          next: (res: Book[]) => {
            this.books = res;
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          }
        });
    }
    else
      this.router.navigateByUrl('shop');
  }

  addToCart() {
    this.buttonClicked = true;
    this.cartService.addToCart(this.book);
  }

}
