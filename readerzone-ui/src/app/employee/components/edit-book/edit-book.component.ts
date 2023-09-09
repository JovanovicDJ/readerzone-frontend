import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, map, startWith } from 'rxjs';
import { CategoriesListComponent } from 'src/app/shared/components/categories-list/categories-list.component';
import { Author } from 'src/app/shared/model/Author';
import { Book } from 'src/app/shared/model/Book';
import { Publisher } from 'src/app/shared/model/Publisher';
import { AuthorService } from 'src/app/shared/services/author-service/author.service';
import { BookService } from 'src/app/shared/services/book-service/book.service';
import { ImageService } from 'src/app/shared/services/image-service/image.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { PublisherService } from 'src/app/shared/services/publisher-service/publisher.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  originalBook!: Book;
  book!: Book;

  bookCover: string = '../../../../assets/placeholder.png';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedGenres: Array<string> = [];

  authors: Array<Author> = [];
  allAuthors: Array<Author> = [];
  @ViewChild('authorInput') authorInput!: ElementRef<HTMLInputElement>;
  authorControl = new FormControl();
  filteredAuthors!: Observable<Author[]>;

  publishers: Array<Publisher> = [];
  selectedPublisher: number = 0;

  @ViewChild(CategoriesListComponent) categoriesComponent!: CategoriesListComponent;

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;

  form!: FormGroup;
  

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private imageService: ImageService,
              private authorService: AuthorService,
              private publisherService: PublisherService) { }

  ngOnInit(): void {
    let isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn !== null) {
      this.bookService
        .getBookByIsbn(isbn)
        .subscribe({
          next: (res: Book) => {
            this.originalBook = res;            
            this.book = JSON.parse(JSON.stringify(this.originalBook));;
            console.log(this.book);
            this.form = this.createFormGroup();
            this.bookCover = this.book.imageUrl;
            this.authors = this.book.authors;
            this.categoriesComponent.checkCheckboxes(this.book.genres.map(g => g.name));            
            this.selectedGenres = this.book.genres.map(g => g.name);
            if (this.book.publisher)
              this.selectedPublisher = this.book.publisher?.id;                        
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          }
        });
      this.getAuthors();
      this.getPublishers();
  
      this.filteredAuthors = this.authorControl.valueChanges.pipe(
        startWith(null),
        map((author: string | null) => (author ? this._filterAuthors(author) : this.allAuthors.slice())),
      );
    } else {
      this.router.navigateByUrl('employee');
    }
  }

  addAuthor(event: MatChipInputEvent): void {    
    console.log(event);
    if (event.value) {
      //this.authors.push(event.value);
    }
    event.chipInput!.clear();
    this.authorControl.setValue(null);
  }

  removeAuthor(author: Author): void {
    const index = this.authors.indexOf(author);

    if (index >= 0) {
      this.authors.splice(index, 1);
    }
  }

  selectedAuthor(event: MatAutocompleteSelectedEvent): void {    
    this.authors.push(event.option.value);
    this.authorInput.nativeElement.value = '';
    this.authorControl.setValue(null);
  }

  private _filterAuthors(value: string): Author[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();    
      return this.allAuthors.filter(author => author.name.toLowerCase().includes(filterValue)
                                            || author.surname.toLowerCase().includes(filterValue));
    } else {
      return this.allAuthors.slice();
    }    
  }

  onOptionSelect(event: MatSelectChange) {
    console.log(event);
    this.selectedPublisher = event.value;
  }

  openFileInput() {
    this.fileInput.nativeElement.click();    
  }

  onSelectionChanged(selectedGenres: Array<string>) {
    this.selectedGenres = selectedGenres;
    console.log(this.selectedGenres);  
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('imageFile', this.fileInput.nativeElement.files[0]);
    this.imageService
      .postImage(formData)
      .subscribe({
        next: (response) => {
          this.bookCover = response.url;        
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
  }

  getAuthors() {
    this.authorService
      .getAuthors()
      .subscribe({
        next: (res: Author[]) => {
          this.allAuthors = res;
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

  getPublishers() {
    this.publisherService
      .getPublishers()
      .subscribe({
        next: (res: Publisher[]) => {
          this.publishers = res;
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      isbn: new FormControl(this.book.isbn, Validators.required),
      title: new FormControl(this.book.title, Validators.required),
      publishingDate: new FormControl(new Date(this.book.publishingDate), Validators.required),
      stocks: new FormControl(this.book.stocks, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      pages: new FormControl(this.book.pages, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      language: new FormControl(this.book.language, Validators.required),
      weight: new FormControl(this.book.weight, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      height: new FormControl(this.book.height, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      width: new FormControl(this.book.width, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      price: new FormControl(this.book.price, [Validators.required, Validators.pattern('^[1-9]+(\.[0-9]{1,2})?$')]),
      discount: new FormControl(this.book.discount, [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  editBook() {
    if (this.authors.length === 0) {
      this.messageService.showMessage('Author is not selected!', MessageType.WARNING);
      return;
    }
    else if (this.selectedGenres.length === 0) {
      this.messageService.showMessage('Book genre is not selected!', MessageType.WARNING);
      return;
    }
    else if (this.selectedPublisher === 0) {
      this.messageService.showMessage('Publisher is not selected!', MessageType.WARNING);
      return;
    }
    else if (this.originalBook === this.book) {
      this.messageService.showMessage('Book was not changed!', MessageType.WARNING);
      return;
    } else {
      this.messageService.showMessage('GOOD!', MessageType.SUCCESS);
    }
  }

}
