import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/shared/model/Customer';
import { CustomerRegistrationRequest } from 'src/app/shared/model/CustomerRegistrationRequest';
import { LoginData } from 'src/app/shared/model/LoginData';
import { ResetPassword } from 'src/app/shared/model/ResetPassword';
import { User } from 'src/app/shared/model/User';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';
import { CustomerService } from 'src/app/shared/services/customer-service/customer.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  EMAIL_ADDRESS_CLAIM_KEY: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
  ROLE_CLAIM_KEY: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.user!);
  
  constructor(private http: HttpClient,
              private jwt: JwtHelperService,
              private customerService: CustomerService,
              private messageService: MessageService,
              private cartService: CartService,
              private router: Router) { }

  get token(): string | null {
    return localStorage.getItem('access-token');
  }

  get user(): User | null {
    let user: string | null = localStorage.getItem('user');
    if (user !== null) return JSON.parse(user);
    else return null;
  }

  get isTokenPresent(): boolean {
    return this.token !== null;
  }

  get isTokenExpired(): boolean {
    return this.jwt.isTokenExpired(this.token);
  }

  get isUserLoggedId(): boolean {
    return this.isTokenPresent && !this.isTokenExpired;
  }

  setToken(token: string): void {
    localStorage.clear();
    localStorage.setItem('access-token', token);
    const decodedToken = this.jwt.decodeToken(token);    
    if (decodedToken[this.ROLE_CLAIM_KEY] === 'Customer') {
      this.customerService
      .getCustomerByEmail(decodedToken[this.EMAIL_ADDRESS_CLAIM_KEY])      
      .subscribe({
        next: (res: Customer) => {          
          localStorage.setItem('user', JSON.stringify(res));          
          this.userSubject.next(this.user!);       
        },
        error: (err) => {          
          this.messageService.showMessage(err.error.detail, MessageType.ERROR);
        },
      });
    }
    //For Employee and Admin
    (decodedToken[this.ROLE_CLAIM_KEY]);
  }

  getUserSubject(): BehaviorSubject<User> {
    return this.userSubject;
  }

  logout(): void {
    localStorage.clear();
    this.cartService.clearCart();    
    this.userSubject.next(this.user!);
    this.router.navigate(['/shop']);
  }

  sendLoginRequest(data: LoginData): Observable<string> {
    let url = `${environment.baseUrl}/${Paths.Login}`;
    return this.http.post<string>(url, data);
  }

  senCustomerRegistrationRequest(data: CustomerRegistrationRequest): Observable<Customer> {
    let url = `${environment.baseUrl}/${Paths.CustomerRegistration}`;
    return this.http.post<Customer>(url, data);
  }

  sendForgottenPasswordRequest(data: { email: string }): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.ForgotPassword}/${data.email}`;
    return this.http.get<void>(url);
  }

  sendResetPasswordRequest(data: ResetPassword): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.ResetPassword}`;
    return this.http.post<void>(url, data);
  }
}
