import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../model/Post';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDataDialogComponent } from '../review-data-dialog/review-data-dialog.component';

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.css']
})
export class ReviewPostComponent implements OnInit {

  @Input()
  post!: Post;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  get postingTime(): string {
    const dateTimeString = this.post.postingTime;
    const parsedDate = moment(dateTimeString);
    return parsedDate.format('DD.MM.YYYY. HH:mm');
  }

  get author(): string {
    return this.post.authorName + ' ' + this.post.authorSurname;
  }

  get genericReviewText(): string {
    return this.post.customerName + ' ' + this.post.customerSurname + ' reviewed the book.';
  }

  openReviewDataDialog() {
    const dialogRef = this.dialog.open(ReviewDataDialogComponent, {
      data: { title: this.post.title,
              rating: this.post.rating,
              text: this.post.text },
      width: '50%',
      height: '70%'
    })
  }

}
