import { Comment } from "./Comment";

export interface Post {
    id: number,
    postingTime: Date,    
    customerId: number,
    customerUsername: string,
    customerName: string,
    customerSurname: string,
    customerImageUrl: string,
    type: string,
    title: string,
    text: string,
    rating: number,
    purchasedBookId: number,
    isbn: string,
    bookTitle: string,
    authorId: number,
    authorName: string,
    authorSurname: string,
    bookImageUrl: string,
    comments: Array<Comment>
}