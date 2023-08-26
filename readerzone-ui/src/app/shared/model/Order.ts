export interface Order {
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
    books: Array<string>
}