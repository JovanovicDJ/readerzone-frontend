import { Order } from "./Order";

export interface OrderResponse {
    orders: Order[],
    totalOrders: number
}