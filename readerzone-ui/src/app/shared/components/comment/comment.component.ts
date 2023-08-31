import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../model/Comment';
import { FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post-service/post.service';
import { MessageService, MessageType } from '../../services/message-service/message.service';
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

  @Output()
  commentAdded = new EventEmitter<Comment>();
  newComment!: Comment;

  @Output()
  commentDeleted = new EventEmitter<number>();
  deletedCommentId!: number;

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
    this.postService
      .commentPost(this.postId, this.commentText.value)
      .subscribe({
        next: (res: Comment) => {
          this.newComment = res;                            
          this.commentAdded.emit(this.newComment);
          this.commentText.setValue('');
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

  removeComment(id: number) {
    this.postService
      .deleteComment(id)
      .subscribe({
        next: () => {
          this.deletedCommentId = id;
          this.commentDeleted.emit(this.deletedCommentId);
        },
        error: (err) => {
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        }
      });
  }

}
