export interface BookRequest {
    title: string,
    authorIds: Array<number>,
    isbn: string,
    publishingDate: string,
    genres: Array<string>,
    stocks: number,
    pages: number,
    language: string,
    weight: number,
    height: number,
    width: number,
    price: number,
    publisherId: number,
    imageUrl: string,
    discount?: number
}