export interface CustomerRegistrationRequest {
    Username: string,
    Email: string,
    Password: string,
    ConfirmPassword: string,
    Name: string,
    Surname: string,
    PhoneNumber: string,
    Dob: string | null,
    Street: string,
    Number: string,
    City: string,
    PostalCode: string,
    Country: string
}