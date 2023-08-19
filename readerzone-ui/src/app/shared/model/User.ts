import { Address } from "cluster";
import { UserAccount } from "./UserAccount";

export interface User {
    Id: number,
    Name: string,
    Surname: string,
    Dob: Date,
    UserAccount: UserAccount,
    Address: Address,
    PhoneNumber: string
}