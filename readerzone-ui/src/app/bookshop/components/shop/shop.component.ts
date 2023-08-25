import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Book } from 'src/app/shared/model/Book';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  books: Book[] = [];
  totalBooks: number = 0;
  pageSize: number = 12;
  pageNumber: number = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

  onBooksChanged(books: Book[]) {
    this.books = books;
  }

  onTotalBooksChanged(totalBooks: number) {
    this.totalBooks = totalBooks;
  }

  onPageChange(event: PageEvent) {
    console.log(event.pageIndex);
    this.pageNumber = event.pageIndex + 1;
  }

}
