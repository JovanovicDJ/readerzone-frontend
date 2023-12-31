import { Book } from "./Book";

export interface Order {
    id: number,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    street: string,
    number: string,
    city: string,
    postalCode: string,
    country: string,
    price: number,
    orderStatus: number,
    books: Array<Book>
}