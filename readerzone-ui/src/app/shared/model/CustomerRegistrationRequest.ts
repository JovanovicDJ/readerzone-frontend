export interface CustomerRegistrationRequest {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    surname: string,
    phoneNumber: string,
    dob: string | null,
    street: string,
    number: string,
    city: string,
    postalCode: string,
    country: string
}