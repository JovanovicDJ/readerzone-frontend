import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from '../../model/OrderRequest';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';
import { Order } from '../../model/Order';
import { OrderResponse } from '../../model/OrderResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  sendOrderRequest(order: OrderRequest): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.Order}`;
    return this.http.post<void>(url, order);
  }

  getPendingOrders(pageNumber: number, pageSize: number): Observable<OrderResponse> {
    let url = `${environment.baseUrl}/${Paths.Order}/pending`;
    const params = new HttpParams()
                        .set('pageNumber', pageNumber)
                        .set('pageSize', pageSize);                        
    return this.http.get<OrderResponse>(url, { params: params });
  }
}
