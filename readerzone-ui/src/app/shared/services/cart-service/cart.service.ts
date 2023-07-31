import { Injectable } from '@angular/core';
import { Book } from '../../model/Book';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Book[] = [];
  private cartSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.cart);

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
    const index = this.cart.findIndex((item) => item.title === book.title);
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

  getTotalPrice(): number {
    return this.cart.reduce((total, book) => total + book.price, 0);
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
