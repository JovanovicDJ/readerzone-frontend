import { Book } from "./Book";
import { Review } from "./Review";

export interface PurchasedBook {
    id: number,
    bookStatus: number,
    book: Book,
    customerId: number,
    review?: Review,
    finalPrice: number
}