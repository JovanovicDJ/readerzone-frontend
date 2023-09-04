import { PurchasedBook } from "./PurchasedBook";

export interface CustomerBooksResponse {
    wantToRead: Array<PurchasedBook>,
    reading: Array<PurchasedBook>,
    read: Array<PurchasedBook>
}