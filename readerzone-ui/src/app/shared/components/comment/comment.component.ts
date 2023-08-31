import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../model/Comment';
import { FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post-service/post.service';
import { MessageService } from '../../services/message-service/message.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/login/services/auth-service/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  comments: Comment[] = [];

  @Input()
  postId: number = 0;

  commentText: FormControl = new FormControl('');

  constructor(private postService: PostService,
              private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  get loggedUserId(): number | undefined {
    return this.authService.user?.id;
  }

  getPostingTime(comment: Comment): string {
    const dateTimeString = comment.postingTime;
    const parsedDate = moment(dateTimeString);
    return parsedDate.format('DD.MM.YYYY. HH:mm');
  }

  comment() {
  
  }

  removeComment(id: number) {

  }

}
