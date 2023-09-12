import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Book } from 'src/app/shared/model/Book';
import { Order } from 'src/app/shared/model/Order';
import { OrderResponse } from 'src/app/shared/model/OrderResponse';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { OrderService } from 'src/app/shared/services/order-service/order.service';

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

  constructor(private orderService: OrderService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  onPageChange(event: PageEvent) {    
    this.pageNumber = event.pageIndex + 1;
    this.getOrders();
  }

  orderCompleted(id: number) {
    console.log(id);
    this.orderService
      .completeOrder(id)
      .subscribe({
        next: () => {
          this.messageService.showMessage(`Order ${id} is completed.`, MessageType.SUCCESS);
          this.orders = this.orders.filter(o => o.id !== id);
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      })
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
}
