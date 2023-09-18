import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';
import { Author } from 'src/app/shared/model/Author';
import { Publisher } from 'src/app/shared/model/Publisher';
import { AuthorService } from 'src/app/shared/services/author-service/author.service';
import { ImageService } from 'src/app/shared/services/image-service/image.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { PublisherService } from 'src/app/shared/services/publisher-service/publisher.service';
import { AddAuthorDialogComponent } from '../add-author-dialog/add-author-dialog.component';
import { AddPublisherDialogComponent } from '../add-publisher-dialog/add-publisher-dialog.component';
import { BookRequest } from 'src/app/shared/model/BookRequest';
import { BookService } from 'src/app/shared/services/book-service/book.service';
import { Book } from 'src/app/shared/model/Book';
import { CategoriesListComponent } from 'src/app/shared/components/categories-list/categories-list.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookCover: string = '../../../../assets/placeholder.png';
  imageSelected: boolean = false;
  selectedGenres: Array<string> = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  authors: Array<Author> = [];
  allAuthors: Array<Author> = [];
  @ViewChild('authorInput') authorInput!: ElementRef<HTMLInputElement>;
  authorControl = new FormControl();
  filteredAuthors!: Observable<Author[]>;

  publishers: Array<Publisher> = [];
  selectedPublisher: number = 0;

  @ViewChild(CategoriesListComponent) childComponent!: CategoriesListComponent;

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;

  form: FormGroup = this.createFormGroup();
  
  constructor(private imageService: ImageService,
              private authorService: AuthorService,
              private publisherService: PublisherService,
              private messageService: MessageService,
              private dialog: MatDialog,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.getAuthors();
    this.getPublishers();

    this.filteredAuthors = this.authorControl.valueChanges.pipe(
      startWith(null),
      map((author: string | null) => (author ? this._filterAuthors(author) : this.allAuthors.slice())),
    );
  }

  addBook() {    
    if (!this.imageSelected) {
      this.messageService.showMessage('Book cover is not selected!', MessageType.WARNING);
      return;
    }
    else if (this.authors.length === 0) {
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
        .addBook(book)
        .subscribe({
          next: (res: Book) => {
            this.bookCover = '../../../../assets/placeholder.png';
            this.authors = [];
            this.selectedPublisher = 0;
            this.childComponent.uncheckCheckboxes();
            //this.form = this.createFormGroup();
            this.form.reset();
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.messageService.showMessage('New book added!', MessageType.SUCCESS);
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          }
        });      
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

  openAddAuthorDialog() {
    const dialogRef = this.dialog.open(AddAuthorDialogComponent, {
      width: '35%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {        
        this.authors.push(result.data);
        this.allAuthors.push(result.data);
      }
    });
  }

  openAddPublisherDialog() {
    const dialogRef = this.dialog.open(AddPublisherDialogComponent, {
      width: '35%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {        
        this.publishers.push(result.data);
        this.selectedPublisher = result.data.id;
      }
    });
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
              this.imageSelected = true;
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
      isbn: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      publishingDate: new FormControl('', Validators.required),
      stocks: new FormControl(0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      pages: new FormControl(0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      language: new FormControl('', Validators.required),
      weight: new FormControl(0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      height: new FormControl(0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      width: new FormControl(0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      price: new FormControl(0, [Validators.required, Validators.pattern('^[1-9]+(\.[0-9]{1,2})?$')]),
    });
  }

}
