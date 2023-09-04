import { Book } from "./Book";

export interface BookPagination {
    totalBooks: number,
    books: Book[]
}