import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../model/Post';
import * as moment from 'moment';

@Component({
  selector: 'app-automatic-post',
  templateUrl: './automatic-post.component.html',
  styleUrls: ['./automatic-post.component.css']
})
export class AutomaticPostComponent implements OnInit {

  @Input()
  post!: Post;

  constructor() { }

  ngOnInit(): void {
  }

  get postingTime(): string {
    const dateTimeString = this.post.postingTime;
    const parsedDate = moment(dateTimeString);
    return parsedDate.format('DD.MM.YYYY. HH:mm');
  }

}
