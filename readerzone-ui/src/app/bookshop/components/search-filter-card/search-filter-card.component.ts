import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoriesListComponent } from 'src/app/shared/components/categories-list/categories-list.component';
import { Book } from 'src/app/shared/model/Book';
import { BookPagination } from 'src/app/shared/model/BookPagination';
import { PaginationQuery } from 'src/app/shared/model/PaginationQuery';
import { BookService } from 'src/app/shared/services/book-service/book.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-search-filter-card',
  templateUrl: './search-filter-card.component.html',
  styleUrls: ['./search-filter-card.component.css']
})
export class SearchFilterCardComponent implements OnInit, OnChanges {

  @ViewChild(CategoriesListComponent) childComponent!: CategoriesListComponent;

  rangeValues: number[] = [0, 100];

  @Input()
  pageNumber: number = 1;
  pageSize: number = 12;

  @Output()
  booksChanged = new EventEmitter<Book[]>();
  books: Book[] = [];

  @Output()
  totalBooksChanged = new EventEmitter<number>();
  totalBooks: number = 0;

  search: FormControl = new FormControl('');
  selectedGenres: Array<string> = [];
  minValue: number = 0;
  maxValue: number = 100;

  constructor(private bookService: BookService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageNumber']) {
      this.getBooks();
    }
  }

  onSelectionChanged(selectedGenres: Array<string>) {
    this.selectedGenres = selectedGenres;    
  }

  onSearch() {
    this.getBooks();
  }

  onSliderChanged(event: any) {
    this.minValue = event.values[0];
    this.maxValue = event.values[1];
  }

  resetParams() {
    this.search.setValue('');
    this.selectedGenres = [];
    this.childComponent.uncheckCheckboxes();
    this.minValue = 0;
    this.maxValue = 100;
    this.rangeValues = [0, 100];
    this.pageNumber = 1; 
    this.getBooks();
  }

  getBooks() {
    let pq: PaginationQuery = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchKeyword: this.search.value,
      selectedGenres: this.selectedGenres,
      minPrice: this.minValue,
      maxPrice: this.maxValue
    };    
    this.bookService
      .getBooks(pq)
      .subscribe({
        next: (res: BookPagination) => {
          this.books = res.books;
          this.totalBooks = res.totalBooks;                    
          this.booksChanged.emit(this.books);
          this.totalBooksChanged.emit(this.totalBooks); 
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

}
