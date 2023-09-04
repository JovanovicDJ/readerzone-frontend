import { Notification } from "./Notification";

export interface NotificationResponse {
    notifications: Notification[],
    totalNotifications: number
}