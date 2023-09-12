import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/shared/model/Book';

@Component({
  selector: 'app-customer-books-dialog',
  templateUrl: './customer-books-dialog.component.html',
  styleUrls: ['./customer-books-dialog.component.css']
})
export class CustomerBooksDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomerBooksDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Book[]) { }

  ngOnInit(): void {
  }

  getAuthor(book: Book): string {
    return book.authors[0].name + ' ' + book.authors[0].surname;
  }

  onExitClick() {  
    this.dialogRef.close(false);
  }

}
