export interface UserAccount {
    Id: number,
    Username: string,
    Email: string,
    Password: string,
    Role: string,
    Active: boolean,
    blocked: boolean
}