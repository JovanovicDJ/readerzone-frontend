import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../model/Customer';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';
import { CustomerBooksResponse } from '../../model/CustomerBooksResponse';
import { ReviewRequest } from 'src/app/customer/models/ReviewRequest';
import { BookData } from '../../model/BookData';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerByEmail(email: string): Observable<Customer> {
    let url = `${environment.baseUrl}/${Paths.Customer}/${email}`;
    return this.http.get<Customer>(url);
  }

  getCustomerById(id: number): Observable<Customer> {
    let url = `${environment.baseUrl}/${Paths.Customer}/id/${id}`;
    return this.http.get<Customer>(url);
  }

  getPurchasedBookByCustomerId(id: number): Observable<CustomerBooksResponse> {
    let url = `${environment.baseUrl}/${Paths.Customer}/books/${id}`;
    return this.http.get<CustomerBooksResponse>(url);
  }

  updatePurchasedBookStatus(purchasedBookId: number, newStatus: number) {
    let url = `${environment.baseUrl}/${Paths.Customer}/${purchasedBookId}?newStatus=${newStatus}`;        
    return this.http.patch(url, null);
  }

  sendReview(review: ReviewRequest): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.Customer}/review`;
    return this.http.post<void>(url, review);
  }

  updateCustomer(data: Object): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.Customer}`;
    return this.http.put<void>(url, data);
  }

  getBooksDataByCustomerId(id: number): Observable<BookData[]> {
    let url = `${environment.baseUrl}/${Paths.Customer}/books/data/${id}`;
    return this.http.get<BookData[]>(url);
  }
}
