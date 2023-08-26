import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';
import { CustomerBooksResponse } from 'src/app/shared/model/CustomerBooksResponse';
import { PurchasedBook } from 'src/app/shared/model/PurchasedBook';
import { CustomerService } from 'src/app/shared/services/customer-service/customer.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { StatusChanged } from '../../models/StatusChanged';

@Component({
  selector: 'app-customer-books',
  templateUrl: './customer-books.component.html',
  styleUrls: ['./customer-books.component.css']
})
export class CustomerBooksComponent implements OnInit {

  wantToReadBooks: PurchasedBook[] = [];
  readingBooks: PurchasedBook[] = [];
  readBooks: PurchasedBook[] = [];

  constructor(private authService: AuthService,
              private customerService: CustomerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    if (this.authService.user) {
      this.customerService
        .getPurchasedBookByCustomerId(this.authService.user.id)
        .subscribe({
          next: (res: CustomerBooksResponse) => {
            this.wantToReadBooks = res.wantToRead;
            this.readingBooks = res.reading;
            this.readBooks = res.read;            
          },
          error: (err) => {          
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          },
        });
    }          
  }

  onStatusChange(statusChanged: StatusChanged) {
    const { purchaseBookId, oldStatus, newStatus } = statusChanged;
  
    let sourceArray: PurchasedBook[];
    let targetArray: PurchasedBook[];
  
    switch (oldStatus) {
      case 0:
        sourceArray = this.wantToReadBooks;
        break;
      case 1:
        sourceArray = this.readingBooks;
        break;      
      default:
        return;
    }
  
    switch (newStatus) {
      case 0:
        targetArray = this.wantToReadBooks;
        break;
      case 1:
        targetArray = this.readingBooks;
        break;
      case 2:
        targetArray = this.readBooks;
        break;
      default:
        return;
    }
  
    const bookToTransfer = sourceArray.find(book => book.id === purchaseBookId);
    if (bookToTransfer) {
      sourceArray.splice(sourceArray.indexOf(bookToTransfer), 1);
      bookToTransfer.bookStatus = newStatus;
      targetArray.push(bookToTransfer);
      this.customerService
        .updatePurchasedBookStatus(purchaseBookId, newStatus)
        .subscribe({
          next: () => {
            this.messageService.showMessage('Book status has been changed.', MessageType.SUCCESS);
          },
          error: (err) => {          
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          },
        })
    }
  }

}
