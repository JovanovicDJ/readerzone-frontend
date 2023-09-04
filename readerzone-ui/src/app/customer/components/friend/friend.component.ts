import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/shared/model/Customer';
import { FriendService } from 'src/app/shared/services/friend-service/friend.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input()
  friend!: Customer;

  @Input()
  isCustomerLoggedIn!: boolean;

  @Output()
  friendDelete = new EventEmitter<number>();

  constructor(private friendService: FriendService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  deleteFriend() {
    this.friendService
      .deleteFriend(this.friend.id)
      .subscribe({
        next: () => {
          this.friendDelete.emit(this.friend.id);
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

}
