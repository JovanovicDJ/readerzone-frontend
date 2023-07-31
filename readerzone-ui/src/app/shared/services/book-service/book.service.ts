import { Injectable } from '@angular/core';
import { Book } from '../../model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private book!: Book;

  constructor() {
    const storedBook = localStorage.getItem('book');
    if (storedBook) {
      this.book = JSON.parse(storedBook);
    }
   }

  setBook(book: Book) {
    this.book = book;
    localStorage.setItem('book', JSON.stringify(this.book));
  }

  getBook(): Book {
    return this.book;
  }
}
