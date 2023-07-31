import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/model/Book';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.css']
})
export class CartDisplayComponent implements OnInit, OnDestroy {

  cart: Book[] = [];
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartSubject().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  goShopping() {
    this.router.navigate(['/shop']);
  }

  removeBook(book: Book) {
    this.cartService.removeFromCart(book);
  }

  clearCart() {
    console.log(this.cart);
    for (let i = this.cart.length - 1; i >= 0; i--) {
      const book = this.cart[i];
      console.log(book.title);
      this.cartService.removeFromCart(book);
    }
  }

  get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

}
