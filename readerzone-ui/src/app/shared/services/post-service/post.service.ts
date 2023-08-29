import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';
import { Observable } from 'rxjs';
import { PostResponse } from '../../model/PostResponse';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getCustomerPosts(pageNumber: number, pageSize: number): Observable<PostResponse> {
    let url = `${environment.baseUrl}/${Paths.Post}`;
    const params = new HttpParams()
                        .set('pageNumber', pageNumber)
                        .set('pageSize', pageSize);
    return this.http.get<PostResponse>(url, { params: params });
  }
}
