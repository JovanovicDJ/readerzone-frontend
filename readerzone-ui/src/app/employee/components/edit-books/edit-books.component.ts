import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/model/Book';
import { BookPagination } from 'src/app/shared/model/BookPagination';
import { PaginationQuery } from 'src/app/shared/model/PaginationQuery';
import { BookService } from 'src/app/shared/services/book-service/book.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css']
})
export class EditBooksComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 5;

  books: Book[] = [];
  totalBooks: number = 0;

  loading: boolean = true;

  constructor(private bookService: BookService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.getBooks();
  }

  onPageChange(event: PageEvent) {    
    this.pageNumber = event.pageIndex + 1;
    this.getBooks();
  }

  getBooks() {
    let pq: PaginationQuery = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchKeyword: '',
      selectedGenres: [],
      minPrice: 0,
      maxPrice: 100
    };    
    this.bookService
      .getBooks(pq)
      .subscribe({
        next: (res: BookPagination) => {
          this.books = res.books;
          this.totalBooks = res.totalBooks;                    
          this.loading = false;
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

  getAuthorNames(book: Book): string {
    var fullnames: string[] = [];
    for (let author of book.authors) {
      fullnames.push(author.name + ' ' + author.surname);
    }
    return fullnames.join(' ,');
  }

  edit(book: Book) {
    let url = `/employee/edit/${book.isbn}`;
    this.router.navigate([url]);
  }

}
