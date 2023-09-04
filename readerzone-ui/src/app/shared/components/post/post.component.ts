import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../model/Post';
import { Comment } from '../../model/Comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post!: Post;

  constructor() { }

  ngOnInit(): void {
  }

  addComment(comment: Comment) {
    this.post.comments.push(comment);
  }

  deleteComment(commentId: number) {
    const indexToDelete = this.post.comments.findIndex(comment => comment.id === commentId);
    if (indexToDelete !== -1) {
      this.post.comments.splice(indexToDelete, 1);
    }
  }

}
