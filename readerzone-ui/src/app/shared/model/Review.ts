import { Customer } from "./Customer";

export interface Review {
    id: number,
    title: string,
    text: string,
    rating: number,
    purchasedBookId: number,
    postingTime: Date,
    likes: number,
    customerId: number,
    customer?: Customer,
    comments?: Array<string>  // Type Comment needed
}