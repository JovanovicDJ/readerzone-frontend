import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Book } from 'src/app/shared/model/Book';
import { Order } from 'src/app/shared/model/Order';
import { OrderResponse } from 'src/app/shared/model/OrderResponse';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { OrderService } from 'src/app/shared/services/order-service/order.service';

interface OrderStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 5;

  orders: Order[] = [];
  totalOrders: number = 0;

  loading: boolean = true;

  selectedStatus: string = '0';
  status: OrderStatus[] = [
    {value: '0', viewValue: 'Pending'},
    {value: '1', viewValue: 'Completed'},  
  ];

  constructor(private orderService: OrderService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  onPageChange(event: PageEvent) {    
    this.pageNumber = event.pageIndex + 1;
    this.getOrders();
  }

  onOptionSelect(event: MatSelectChange) {
    if (+event.value === 1) {
      console.log("COMPLETED!");
    }
  }

  getOrders() {
    this.orderService
      .getPendingOrders(this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: OrderResponse) => {
          this.orders = res.orders;
          this.totalOrders = res.totalOrders;
          this.loading = false;
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      })
  }

  userDataDialog(order: Order) {

  }

  booksDialog(books: Book[]) {

  }


}
