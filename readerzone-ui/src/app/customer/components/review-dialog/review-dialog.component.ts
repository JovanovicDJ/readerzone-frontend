import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PurchasedBook } from 'src/app/shared/model/PurchasedBook';
import { ReviewRequest } from '../../models/ReviewRequest';
import { CustomerService } from 'src/app/shared/services/customer-service/customer.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {

  title: FormControl = new FormControl('', Validators.required);
  rating: number = 1;
  text: FormControl = new FormControl('', Validators.required);

  constructor(@Inject(MAT_DIALOG_DATA) public data: PurchasedBook,
              public dialogRef: MatDialogRef<ReviewDialogComponent>,
              private customerService: CustomerService,
              private messageService: MessageService) {}

  ngOnInit(): void {

  }

  get authorNames(): string {
    var fullnames: string[] = [];
    for (let author of this.data.book.authors) {
      fullnames.push(author.name + ' ' + author.surname);
    }
    return fullnames.join(' ,');    
  }

  onCancelClick() {  
    this.dialogRef.close(false);
  }

  onSendReview() {
    if (this.text.valid && this.title.valid) {
      var review: ReviewRequest = {
        title: this.title.value,
        text: this.text.value,
        rating: this.rating,
        purchasedBookId: this.data.id
      }
      this.customerService
        .sendReview(review)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.messageService.showMessage(err.error.message, MessageType.ERROR);
          },
        });      
    }
  }

}
