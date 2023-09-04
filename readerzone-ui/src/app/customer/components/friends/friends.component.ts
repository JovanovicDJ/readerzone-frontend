import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';
import { Customer } from 'src/app/shared/model/Customer';
import { FriendService } from 'src/app/shared/services/friend-service/friend.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Input()
  isCustomerLoggedIn!: boolean;

  @Input()
  customerId!: number;

  friends: Customer[] = []
  loading: boolean = true;

  constructor(private messageService: MessageService,
              private friendService: FriendService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getCustomerFriends();
  }

  getCustomerFriends() {
    this.friendService
      .getFriendsForCustomer(this.customerId)
      .subscribe({
        next: (res: Customer[]) => {
          this.friends = res;
          this.loading = false;
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

  deleteFriend(friendId: number) {
    this.friends = this.friends.filter((friend) => friend.id !== friendId);
  }
}
