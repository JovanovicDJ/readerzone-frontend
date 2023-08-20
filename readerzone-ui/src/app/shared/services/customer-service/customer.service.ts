import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../model/Customer';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerByEmail(email: string): Observable<Customer> {
    let url = `${environment.baseUrl}/${Paths.Customer}/${email}`;
    return this.http.get<Customer>(url);
  }
}
