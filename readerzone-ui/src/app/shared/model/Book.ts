import { Author } from "./Author";
import { Genre } from "./Genre";
import { Publisher } from "./Publisher";

export interface Book {
    id: number,
    title: string,
    authors: Array<Author>,
    isbn: string,
    publishingDate: Date,
    genres: Array<Genre>,
    stocks: number,
    pages: number,
    language: string,
    weight: number,
    height: number,
    width: number,
    price: number,
    publisher: Publisher,
    imageUrl: string,
    discount: number,
    averageRating: number
}