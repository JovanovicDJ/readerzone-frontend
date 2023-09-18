import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/model/Book';
import { BookService } from 'src/app/shared/services/book-service/book.service';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit, OnDestroy {

  @Input()
  book!: Book;

  private logoutSubscription!: Subscription;

  buttonClicked: boolean = false;

  constructor(private cartService: CartService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.logoutSubscription = this.cartService.getLogoutSubject().subscribe((bool) => {
      this.buttonClicked = bool;
    })    
  }

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
  }

  onBookClick() {
    var url = `/shop/book/${this.book.isbn}`;
    this.router.navigate([url]);
    //window.location.href = url;
  }

  addToCart() {
    this.buttonClicked = true;
    this.cartService.addToCart(this.book);
  }  

  get discountPrice(): number {
    var discount = this.book.price * this.book.discount / 100;
    return this.book.price - discount;
  }

}
