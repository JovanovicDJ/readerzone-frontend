import { User } from "./User";

export interface Customer extends User {
    Tier: string,
    Points: number,
    AnnualChallenge: number
}