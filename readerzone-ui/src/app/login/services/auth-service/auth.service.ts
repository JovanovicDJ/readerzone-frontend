import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/shared/model/Customer';
import { CustomerRegistrationRequest } from 'src/app/shared/model/CustomerRegistrationRequest';
import { Employee } from 'src/app/shared/model/Employee';
import { EmployeeRegistrationRequest } from 'src/app/shared/model/EmployeeRegistrationRequest';
import { LoginData } from 'src/app/shared/model/LoginData';
import { ResetPassword } from 'src/app/shared/model/ResetPassword';
import { User } from 'src/app/shared/model/User';
import { CartService } from 'src/app/shared/services/cart-service/cart.service';
import { CustomerService } from 'src/app/shared/services/customer-service/customer.service';
import { EmployeeService } from 'src/app/shared/services/employee-service/employee.service';
import { FriendService } from 'src/app/shared/services/friend-service/friend.service';
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
              private router: Router,
              private friendService: FriendService,
              private employeeService: EmployeeService) { }

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

  isFriend(friendId: number): boolean {
    let friends: string | null = localStorage.getItem('friends');
    if (friends !== null) {
      const friendIds = JSON.parse(friends);
      return friendIds.includes(friendId);
    }
    return false;
  }

  addFriend(friendId: number) {
    let friends: string | null = localStorage.getItem('friends');
    if (friends !== null) {
      const friendIds = JSON.parse(friends);
      friendIds.push(friendId);
      localStorage.setItem('friends', JSON.stringify(friendIds));
    }
  }

  deleteFriend(friendId: number) {
    let friends: string | null = localStorage.getItem('friends');
    if (friends !== null) {
      let friendIds: number[] = JSON.parse(friends);
      friendIds = friendIds.filter((id) => id !== friendId);
      localStorage.setItem('friends', JSON.stringify(friendIds));
    }
  }

  setToken(token: string): string {
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
      
      this.friendService
        .getFriends()
        .subscribe({
          next: (res: Customer[]) => {            
            const idArray = res.map(customer => customer.id);
            localStorage.setItem('friends', JSON.stringify(idArray));
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);
          }
        });

    } else { //(decodedToken[this.ROLE_CLAIM_KEY] === 'Admin' || decodedToken[this.ROLE_CLAIM_KEY] === 'Manager') {
      this.employeeService
        .getEmployeeByEmail(decodedToken[this.EMAIL_ADDRESS_CLAIM_KEY])
        .subscribe({
          next: (res: Employee) => {
            localStorage.setItem('user', JSON.stringify(res));
            this.userSubject.next(this.user!);            
          },
          error: (err) => {
            this.messageService.showMessage(err.error.detail, MessageType.ERROR);      
          }
        });
    }
    return decodedToken[this.ROLE_CLAIM_KEY];
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

  sendCustomerRegistrationRequest(data: CustomerRegistrationRequest): Observable<Customer> {
    let url = `${environment.baseUrl}/${Paths.CustomerRegistration}`;
    return this.http.post<Customer>(url, data);
  }

  sendEmployeeRegistrationRequest(data: EmployeeRegistrationRequest): Observable<Employee> {
    let url = `${environment.baseUrl}/${Paths.EmployeeRegistration}`;
    return this.http.post<Employee>(url, data);
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
