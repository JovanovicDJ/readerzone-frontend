import { Injectable } from '@angular/core';
import { Book } from '../../model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private book!: Book;

  constructor() { }

  setBook(book: Book) {
    this.book = book;
  }

  getBook(): Book {
    return this.book;
  }
}
