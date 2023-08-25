import { User } from "./User";

export interface Customer extends User {
    tier: number,
    points: number,
    annualChallenge: number
}