import { Component, Input, OnInit } from '@angular/core';
import { BookData } from '../../model/BookData';
import { stat } from 'fs';

@Component({
  selector: 'app-book-carousel',
  templateUrl: './book-carousel.component.html',
  styleUrls: ['./book-carousel.component.css']
})
export class BookCarouselComponent implements OnInit {

  @Input()
  books: BookData[] = []

  @Input()
  title: string = '';

  @Input()
  showStatus: boolean = true;

  @Input()
  numVisible: number = 2;

  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];

  constructor() { }

  ngOnInit(): void {
  }

  getBookStatus(status: number): string {
	switch (status) {
		case 0: return 'Wants to Read';
		case 1: return 'Reading';
		case 2: return 'Read';
		default: return 'Wants to Read';
	}
  }

  getStatusClass(status: number) {
	switch (status) {
		case 0: return 'status-0';
		case 1: return 'status-1';
		case 2: return 'status-2';
		default: return 'status-0';
	}
  }

}
