import { Injectable } from '@angular/core';
import { Book } from '../../model/Book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';
import { BookPagination } from '../../model/BookPagination';
import { PaginationQuery } from '../../model/PaginationQuery';
import { BookRequest } from '../../model/BookRequest';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private book!: Book;

  constructor(private http: HttpClient) { }

  getBookByIsbn(isbn: string): Observable<Book> {
    let url = `${environment.baseUrl}/${Paths.Book}/${isbn}`;
    return this.http.get<Book>(url);
  }

  getRecommendedBooks(): Observable<Book[]> {
    let url = `${environment.baseUrl}/${Paths.Book}/recommended`;
    return this.http.get<Book[]>(url);
  }

  getBooks(pq: PaginationQuery): Observable<BookPagination> {
    let url =  `${environment.baseUrl}/${Paths.Book}/books`;
    return this.http.post<BookPagination>(url, pq);
  }

  addBook(book: BookRequest): Observable<Book> {
    let url = `${environment.baseUrl}/${Paths.Book}`;
    return this.http.post<Book>(url, book);
  }

  editBook(book: BookRequest): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.Book}`;
    return this.http.put<void>(url, book);
  }
}
