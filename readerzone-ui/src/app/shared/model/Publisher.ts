import { Address } from "cluster";

export interface Publisher {
    id: number,
    name: string,
    address: Address,
    established: Date
}