import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationResponse } from 'src/app/shared/model/NotificationResponse';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getCustomerNotifications(pageNumber: number, pageSize: number): Observable<NotificationResponse> {
    let url = `${environment.baseUrl}/${Paths.Notification}`;
    const params = new HttpParams()
                        .set('pageNumber', pageNumber)
                        .set('pageSize', pageSize);                        
    return this.http.get<NotificationResponse>(url, { params: params });
  }

  sendFriendRequest(customerId: number): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.Friend}/request/${customerId}`;
    return this.http.get<void>(url);
  }

  addFriend(friendId: number) : Observable<void> {
    let url = `${environment.baseUrl}/${Paths.Friend}/add/${friendId}`;
    return this.http.get<void>(url);
  }

  rejectFriendship(notificationId: number) {
    let url = `${environment.baseUrl}/${Paths.Friend}/reject/${notificationId}`;
    return this.http.get<void>(url);
  }
}
