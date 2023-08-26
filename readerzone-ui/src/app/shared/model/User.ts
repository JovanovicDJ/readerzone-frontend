import { Address } from "./Address";
import { UserAccount } from "./UserAccount";

export interface User {
    id: number,
    name: string,
    surname: string,
    dob: Date,
    userAccount: UserAccount,
    address: Address,
    phoneNumber: string
}