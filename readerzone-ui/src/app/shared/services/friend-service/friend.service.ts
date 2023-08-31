import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';
import { Customer } from '../../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  getCustomersSearch(query: string): Observable<Customer[]> {
    let url = `${environment.baseUrl}/${Paths.Friend}/search`;
    const params = new HttpParams()
                        .set('query', query);
    return this.http.get<Customer[]>(url, { params: params });
  }

  addFriend(friendId: number): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.Friend}/add/${friendId}`;
    return this.http.get<void>(url);
  }

  getFriends(): Observable<Customer[]> {
    let url = `${environment.baseUrl}/${Paths.Friend}`;
    return this.http.get<Customer[]>(url);
  }

}
