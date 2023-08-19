import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/model/Book';
import { BookService } from 'src/app/shared/services/book-service/book.service';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book!: Book;

  buttonClicked: boolean = false;

  books: Book[] = [
    {
      image: "https://m.media-amazon.com/images/I/41VnFKC9srL._AC_UF1000,1000_QL80_.jpg",
      title: "Moby-Dick",
      author: "Herman Melville",
      price: 14.95,
    },
    {
      image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      price: 21.99,
    },
    {
      image: "https://m.media-amazon.com/images/I/71fWBj3qq+L.jpg",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: 13.25,
    },
    {
      image: "https://images.squarespace-cdn.com/content/v1/58c180edff7c50dd0e51a2ad/1596042032039-IN7LLXRVDKGVC854LVHE/9780241375273.jpg",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 9.99,
    },
    {
      image: "https://cdn.quotesgram.com/img/61/61/380465297-tumblr_masbephBNb1qlxr40o1_1280.jpg",
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      price: 11.49,
    }
  ];

  constructor(private bookService: BookService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.book = this.bookService.getBook();
  }

  addToCart() {
    this.buttonClicked = true;
    this.cartService.addToCart(this.book);
  }

}
