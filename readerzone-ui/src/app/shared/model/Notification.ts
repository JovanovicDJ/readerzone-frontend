export interface Notification {
    id: number,
    customerId: number,
    fromCustomerName: string,
    fromCustomerSurname: string,
    fromCustomerUsername: string,
    fromCustomerId: number,
    text: string,
    sendingTime: Date,
    notificationType: number,
    deleted: boolean
}