import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Order } from 'src/app/shared/model/Order';
import { CustomerDataDialogComponent } from '../customer-data-dialog/customer-data-dialog.component';
import { CustomerBooksDialogComponent } from '../customer-books-dialog/customer-books-dialog.component';

interface OrderStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input()
  order!: Order;

  @Output()
  statusChanged = new EventEmitter<number>();

  selectedStatus: string = '0';
  status: OrderStatus[] = [
    {value: '0', viewValue: 'Pending'},
    {value: '1', viewValue: 'Completed'},  
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onOptionSelect(event: MatSelectChange) {
    if (+event.value === 1) {
      this.statusChanged.emit(this.order.id);
    }
  }

  customerDataDialog() {
    this.dialog.open(CustomerDataDialogComponent, {
      data: this.order,
      width: '40%',
      height: '80%'
    })
  }

  booksDialog() {
    this.dialog.open(CustomerBooksDialogComponent, {
      data: this.order.books,
      width: '40%',
      height: '80%'
    })
  }

}
