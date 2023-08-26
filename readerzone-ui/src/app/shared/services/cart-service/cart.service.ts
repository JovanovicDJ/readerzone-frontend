import { Injectable } from '@angular/core';
import { Book } from '../../model/Book';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {  
  private cart: Book[] = [];
  private cartSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.cart);
  private logoutSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartSubject.next(this.cart);
    }
  }

  addToCart(book: Book) {
    this.cart.push(book);
    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  removeFromCart(book: Book) {
    const index = this.cart.findIndex((item) => item.isbn === book.isbn);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveCartToLocalStorage();
      this.cartSubject.next(this.cart);
    }
  }

  getCart(): Book[] {
    return this.cart;
  }

  getCartSubject(): BehaviorSubject<Book[]> {
    return this.cartSubject;
  }

  getLogoutSubject(): BehaviorSubject<boolean> {
    return this.logoutSubject;
  }

  getTotalPrice(): number {
    var total = 0;
    for (var b of this.cart) {
      if (b.discount !== 0) {
        var discount = b.price * b.discount / 100;
        total += b.price - discount;
      } else {
        total += b.price;
      }
    }
    return total;
    //return this.cart.reduce((total, book) => total + book.price, 0);
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = [];
    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
    this.logoutSubject.next(false);
  }

  saveFinalPriceToLocalStorage(price: number): void {
    var num = Math.round(price * 100) / 100
    localStorage.setItem('final-price', num.toString());
  }

  get finalPrice(): number {
    const storedEndPrice = localStorage.getItem('final-price');
    if (storedEndPrice) {
      return +storedEndPrice;
    } else {
      return 0;
    }
  }

  getBooksIsbn(): Array<string> {
    var isbns: Array<string> = [];    
    for (var b of this.cart) {
      isbns.push(b.isbn);
    }    
    return isbns;
  }
}
