import { Address } from "./Address";

export interface Publisher {
    id: number,
    name: string,
    address?: Address,
    established: Date
}