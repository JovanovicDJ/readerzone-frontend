import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Notification } from 'src/app/shared/model/Notification';
import { NotificationService } from '../../services/notification.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input()
  notification!: Notification;
  buttonClicked: boolean = false;

  constructor(private notificationService: NotificationService,
              private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  get sendingTime(): string {
    const dateTimeString = this.notification.sendingTime;
    const parsedDate = moment(dateTimeString);
    return parsedDate.format('DD.MM.YYYY. HH:mm');
  }

  acceptFriendship() {    
    this.notificationService
      .addFriend(this.notification.fromCustomerId)
      .subscribe({
        next: () => {
          this.buttonClicked = true;
          this.authService.addFriend(this.notification.fromCustomerId);
          this.messageService.showMessage('Friend request is accepted!', MessageType.SUCCESS);
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

  rejectFriendship() {    
    this.notificationService
      .rejectFriendship(this.notification.id)
      .subscribe({
        next: () => {
          this.buttonClicked = true;
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

}
