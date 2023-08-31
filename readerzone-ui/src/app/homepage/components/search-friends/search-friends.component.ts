import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';
import { Customer } from 'src/app/shared/model/Customer';
import { FriendService } from 'src/app/shared/services/friend-service/friend.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.css']
})
export class SearchFriendsComponent implements OnInit {
  
  search: FormControl = new FormControl('');

  pending: boolean = false;

  customers: Customer[] = [];

  constructor(private messageService: MessageService,
              private friendService: FriendService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  isFriend(id: number): boolean {
    return this.authService.isFriend(id);
  }

  onSearch() {
    if (this.search.value === '') {
      this.messageService.showMessage('Search query can not be empty.', MessageType.WARNING);
    } else {
      this.friendService
        .getCustomersSearch(this.search.value)
        .subscribe({
          next: (res: Customer[]) => {
            this.customers = res;
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          }
        });
    }
  }

  addFriend(friendId: number) {
    this.pending = true;
    // this.friendService
    //   .addFriend(friendId)
    //   .subscribe({
    //     next: () => {
    //       this.pending = true;
    //       //dodati prijatelja u local storage da bi se class dugmeta izmenio
    //     },
    //     error: (err) => {
    //       this.messageService.showMessage(err.error.detail, MessageType.ERROR);
    //     }
    //   });
  }


}
