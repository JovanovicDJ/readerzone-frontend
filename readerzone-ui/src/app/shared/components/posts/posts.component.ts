import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service/post.service';
import { Post } from '../../model/Post';
import { MessageService, MessageType } from '../../services/message-service/message.service';
import { PostResponse } from '../../model/PostResponse';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  friendsPost: boolean = false;
  @Input()
  pageSize: number = 5;
  @Input()
  customerId: number = 0;
  pageNumber: number = 1;
  totalPosts: number = 0;
  posts: Post[] = []
  loading: boolean = true;

  constructor(private postService: PostService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (this.friendsPost) {
      this.getFriendsPosts();
    } else {
      this.getCustomerPosts();
    }
  }

  getFriendsPosts() {
    this.postService
      .getFriendsPosts(this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: PostResponse) => {
          this.posts = res.posts;
          this.totalPosts = res.totalPosts;
          this.loading = false;
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      }); 
  }

  getCustomerPosts() {
    this.postService
      .getCustomerPosts(this.pageNumber, this.pageSize, this.customerId)
      .subscribe({
        next: (res: PostResponse) => {
          this.posts = res.posts;
          this.totalPosts = res.totalPosts;
          this.loading = false;
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

  onPageChange(event: PageEvent) {    
    this.pageNumber = event.pageIndex + 1;
    this.init();
  }

}
