export interface Comment {
    id: number,
    postingTime: Date
    likes: number,
    text: string,
    customerId: number,
    customerUsername: string,
    customerName: string,
    customerSurname: string,
    customerImageUrl: string
}