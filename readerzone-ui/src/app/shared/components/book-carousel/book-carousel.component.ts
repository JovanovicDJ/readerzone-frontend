import { Component, Input, OnInit } from '@angular/core';
import { BookData } from '../../model/BookData';

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


  products = [
    {
			"id": "1000",
			"code": "f230fh0g3",
			"name": "Bamboo Watch",
			"description": "Product Description",
			"image": "bamboo-watch.jpg",
			"price": 65,
			"category": "Accessories",
			"quantity": 24,
			"inventoryStatus": "INSTOCK",
			"rating": 5
		},
		{
			"id": "1001",
			"code": "nvklal433",
			"name": "Black Watch",
			"description": "Product Description",
			"image": "black-watch.jpg",
			"price": 72,
			"category": "Accessories",
			"quantity": 61,
			"inventoryStatus": "INSTOCK",
			"rating": 4
		},
		{
			"id": "1002",
			"code": "zz21cz3c1",
			"name": "Blue Band",
			"description": "Product Description",
			"image": "blue-band.jpg",
			"price": 79,
			"category": "Fitness",
			"quantity": 2,
			"inventoryStatus": "LOWSTOCK",
			"rating": 3
		},

    {
			"id": "1003",
			"code": "244wgerg2",
			"name": "Blue T-Shirt",
			"description": "Product Description",
			"image": "blue-t-shirt.jpg",
			"price": 29,
			"category": "Clothing",
			"quantity": 25,
			"inventoryStatus": "INSTOCK",
			"rating": 5
		},
		{
			"id": "1004",
			"code": "h456wer53",
			"name": "Bracelet",
			"description": "Product Description",
			"image": "bracelet.jpg",
			"price": 15,
			"category": "Accessories",
			"quantity": 73,
			"inventoryStatus": "INSTOCK",
			"rating": 4
		}
  ];

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

}
