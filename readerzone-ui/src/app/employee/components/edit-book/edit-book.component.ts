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
import { BookRequest } from 'src/app/shared/model/BookRequest';
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
            this.book = JSON.parse(JSON.stringify(this.originalBook));            
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
    this.selectedPublisher = event.value;
  }

  openFileInput() {
    this.fileInput.nativeElement.click();    
  }

  onSelectionChanged(selectedGenres: Array<string>) {
    this.selectedGenres = selectedGenres;     
  }

  uploadImage() {
    const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
    const formData = new FormData();
    const selectedFiles = this.fileInput.nativeElement.files;

    if (selectedFiles.length === 1) {
      const selectedFile = this.fileInput.nativeElement.files[0];
      if (selectedFile.type.startsWith('image/') && selectedFile.size <= MAX_IMAGE_SIZE_BYTES) {                
        formData.append('imageFile', selectedFile);              
        this.imageService
          .postImage(formData)
          .subscribe({
            next: (response) => {
              this.bookCover = response.url; 
            },
            error: (error) => {            
              this.messageService.showMessage(error.err.detail, MessageType.ERROR);
            }
        });

      } else {        
        if (!selectedFile.type.startsWith('image/')) {
          this.messageService.showMessage('Invalid file type. Please select an image.', MessageType.WARNING);
        } else {          
          this.messageService.showMessage('File size exceeds the maximum allowed size.', MessageType.WARNING);
        }
      }
    } else {
      this.messageService.showMessage('Please select one image file.', MessageType.WARNING);
    }
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
    else {
      const parsedDate = new Date(this.form.get('publishingDate')?.value);
      const day = String(parsedDate.getDate()).padStart(2, '0');
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const year = parsedDate.getFullYear();
      var formattedDate = `${day}.${month}.${year}.`;
      let book: BookRequest = {
        ...this.form.getRawValue(),
        publishingDate: formattedDate,
        authorIds: this.authors.map(author => author.id),
        genres: this.selectedGenres,
        publisherId: this.selectedPublisher,
        imageUrl: this.bookCover
      };
      this.bookService
        .editBook(book)
        .subscribe({
          next: () => {
            this.messageService.showMessage('Book updated.', MessageType.SUCCESS);
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          }
        });
    }
  }
}
