import { Book } from "./Book";

export interface PurchasedBook {
    id: number,
    bookStatus: number,
    book: Book,
    customerId: number,
    review?: any,       // Type Review soon
    finalPrice: number
}