export interface UserAccount {
    id: number,
    username: string,
    email: string,
    password: string,
    role: string,
    active: boolean,
    blocked: boolean
}