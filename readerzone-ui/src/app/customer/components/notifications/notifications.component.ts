import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NotificationService } from '../../services/notification.service';
import { NotificationResponse } from 'src/app/shared/model/NotificationResponse';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { Notification } from 'src/app/shared/model/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  pageSize: number = 5;
  pageNumber: number = 1;
  totalNotifications: number = 0;
  notifications: Notification[] = []
  loading: boolean = true;

  constructor(private notificationService: NotificationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCustomerNotifications();
  }

  getCustomerNotifications() {
    this.notificationService
      .getCustomerNotifications(this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: NotificationResponse) => {
          this.notifications = res.notifications;
          this.totalNotifications = res.totalNotifications;
          this.loading = false;
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

  onPageChange(event: PageEvent) {    
    this.pageNumber = event.pageIndex + 1;
    this.getCustomerNotifications();
  }

}
