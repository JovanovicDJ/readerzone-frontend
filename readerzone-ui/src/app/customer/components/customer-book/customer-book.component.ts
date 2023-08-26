import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PurchasedBook } from 'src/app/shared/model/PurchasedBook';
import { StatusChanged } from '../../models/StatusChanged';

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

  constructor() { }

  ngOnInit(): void {
    this.selectedStatus = this.status[this.book.bookStatus].value;
  }

  get authorNames(): string {
    var fullnames: string[] = [];
    for (let author of this.book.book.authors) {
      fullnames.push(author.name + ' ' + author.surname);
    }
    return fullnames.join(' ,');    
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

}
