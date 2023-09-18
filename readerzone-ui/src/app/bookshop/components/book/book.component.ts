import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as moment from 'moment';
import { filter } from 'rxjs';
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
  loading: boolean = true;

  books: Book[] = [];

  constructor(private bookService: BookService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private router: Router) { }  

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
    this.getData();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.includes('/shop/book/'))
          this.getData();        
      });
  }

  getData() {
    let isbn = this.route.snapshot.paramMap.get('isbn');    
    if (isbn !== null) {
      this.bookService
        .getBookByIsbn(isbn)
        .subscribe({
          next: (res: Book) => {
            this.book = res;
            this.loading = false;
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
