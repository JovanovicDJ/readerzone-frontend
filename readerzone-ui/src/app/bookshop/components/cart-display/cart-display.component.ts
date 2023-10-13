import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';
import { Book } from 'src/app/shared/model/Book';
import { Customer } from 'src/app/shared/model/Customer';
import { Role } from 'src/app/shared/model/enums/Role';
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
              private router: Router,
              private authService: AuthService) { }

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
    // for (let i = this.cart.length - 1; i >= 0; i--) {
    //   const book = this.cart[i];      
    //   this.cartService.removeFromCart(book);
    // }
    this.cartService.clearCart();
  }

  get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  get finalPrice(): number {
    var total = this.cartService.getTotalPrice();
    var discount = total * this.membersDiscount / 100;
    return total - discount;
  }

  getAuthorNames(book: Book): string {
    var fullnames: string[] = [];
    for (let author of book.authors) {
      fullnames.push(author.name + ' ' + author.surname);
    }
    return fullnames.join(' ,');
  }

  getDiscountPrice(b: Book): number {
    var discount = b.price * b.discount / 100;
    return b.price - discount;
  }

  get membersDiscount(): number {
    if (this.authService.user === null) {
      return 0;
    }
    else if (this.authService.user.userAccount.role === Role.Customer) {      
      const customer = this.authService.user as Customer;      
      switch(customer.tier) {
        case 0: return 3;
        case 1: return 6;
        case 2: return 10;
        case 3: return 15;
        default: return 0;
      }
    } else {      
      return 0;
    }
  }

  checkout() {
    this.cartService.saveFinalPriceToLocalStorage(this.finalPrice);
    this.router.navigate(['/shop/checkout']);
  }
}
