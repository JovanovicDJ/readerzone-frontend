import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/model/Book';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  books: Book[] = [
    {
      image: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 15.99,
    },
    {
      image: "https://m.media-amazon.com/images/I/51xGF07qJXL.jpg",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 12.49,
    },
    {
      image: "https://m.media-amazon.com/images/I/519zR2oIlmL._AC_UF894,1000_QL80_.jpg",
      title: "1984",
      author: "George Orwell",
      price: 11.99,
    },
    {
      image: "https://images.squarespace-cdn.com/content/v1/58c180edff7c50dd0e51a2ad/1596042032039-IN7LLXRVDKGVC854LVHE/9780241375273.jpg",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 9.99,
    },
    {
      image: "https://m.media-amazon.com/images/I/71-++hbbERL.jpg",
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      price: 14.99,
    },
    {
      image: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 10.79,
    },
    {
      image: "https://m.media-amazon.com/images/I/71fWBj3qq+L.jpg",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: 13.25,
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1661032875i/11127.jpg",
      title: "The Chronicles of Narnia",
      author: "C.S. Lewis",
      price: 18.50,
    },
    {
      image: "https://cdn.quotesgram.com/img/61/61/380465297-tumblr_masbephBNb1qlxr40o1_1280.jpg",
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      price: 11.49,
    },
    {
      image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      price: 21.99,
    },
    {
      image: "https://m.media-amazon.com/images/I/71O1It5N1VS._AC_UF1000,1000_QL80_.jpg",
      title: "Alice's Adventures in Wonderland",
      author: "Lewis Carroll",
      price: 8.95,
    },
    {
      image: "https://m.media-amazon.com/images/I/41VnFKC9srL._AC_UF1000,1000_QL80_.jpg",
      title: "Moby-Dick",
      author: "Herman Melville",
      price: 14.95,
    },
  ];  

  constructor() { }

  ngOnInit(): void {
  }

}
