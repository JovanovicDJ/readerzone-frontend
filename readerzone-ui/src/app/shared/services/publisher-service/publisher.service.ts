import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publisher } from '../../model/Publisher';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';
import { PublisherRequest } from '../../model/PublisherRequest';
import { BookData } from '../../model/BookData';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }

  getPublishers(): Observable<Publisher[]> {
    let url = `${environment.baseUrl}/${Paths.Publisher}`;
    return this.http.get<Publisher[]>(url);
  }

  addPublisher(publisher: PublisherRequest): Observable<Publisher> {
    let url = `${environment.baseUrl}/${Paths.Publisher}`;
    return this.http.post<Publisher>(url, publisher);
  }

  getPublisher(id: number): Observable<Publisher> {
    let url = `${environment.baseUrl}/${Paths.Publisher}/${id}`;
    return this.http.get<Publisher>(url);
  }

  getPublisherBooks(id: number): Observable<BookData[]> {
    let url = `${environment.baseUrl}/${Paths.Publisher}/books/${id}`;
    return this.http.get<BookData[]>(url);
  }
}
