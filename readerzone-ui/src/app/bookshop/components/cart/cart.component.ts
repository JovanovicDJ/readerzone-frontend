import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/model/Book';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

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

  get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  displayCart() {
    this.router.navigate(['/shop/cart']);
  }

}
