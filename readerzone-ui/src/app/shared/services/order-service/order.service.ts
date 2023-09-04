import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../model/Order';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  sendOrderRequest(order: Order): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.Order}`;
    return this.http.post<void>(url, order);
  }
}
