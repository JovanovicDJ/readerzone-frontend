export interface UserAccount {
    id: number,
    username: string,
    email: string,
    password: string,
    role: number,
    active: boolean,
    blocked: boolean
}