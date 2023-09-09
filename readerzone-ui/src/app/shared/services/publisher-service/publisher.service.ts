import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publisher } from '../../model/Publisher';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';
import { PublisherRequest } from '../../model/PublisherRequest';

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
}
