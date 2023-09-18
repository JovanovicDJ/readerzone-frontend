import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PurchasedBook } from 'src/app/shared/model/PurchasedBook';
import { StatusChanged } from '../../models/StatusChanged';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

interface BookStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-customer-book',
  templateUrl: './customer-book.component.html',
  styleUrls: ['./customer-book.component.css']
})
export class CustomerBookComponent implements OnInit {

  status: BookStatus[] = [
    {value: '0', viewValue: 'Want to Read'},
    {value: '1', viewValue: 'Reading'},
    {value: '2', viewValue: 'Read'},
  ];

  @Input()
  book!: PurchasedBook;

  @Input()
  isRead: boolean = false;

  @Output()
  statusChanged = new EventEmitter<StatusChanged>();

  selectedStatus: string = '0';
  disableReview: boolean = false;

  constructor(private dialog: MatDialog,
              private messageService: MessageService) { }

  ngOnInit(): void {    
    this.selectedStatus = this.status[this.book.bookStatus].value;
  }

  get disableReviewButton(): boolean {
    if (!this.isRead) {
      return true;
    }
    else {
      if (this.book.review !== null) {
        return true;
      }
      if (this.disableReview) {
        return true;
      }
      else {
        return false;
      }      
    }
  }

  onOptionSelect(event: MatSelectChange) {
    if (+event.value !== this.book.bookStatus) {
      var statusChanged: StatusChanged = {
        purchaseBookId: this.book.id,
        oldStatus: this.book.bookStatus,
        newStatus: +event.value
      }
      this.statusChanged.emit(statusChanged);      
    }
  }

  openReviewDialog() {
    if (this.isRead && this.book.review === null) {
      const dialogRef = this.dialog.open(ReviewDialogComponent, {
        data: this.book,
        width: '50%',
        height: '70%'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.disableReview = true;
          this.messageService.showMessage('Review is sent.', MessageType.SUCCESS);
        }
      });
    }
  }

}
