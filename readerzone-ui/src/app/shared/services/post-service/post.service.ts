import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';
import { Observable } from 'rxjs';
import { PostResponse } from '../../model/PostResponse';
import { Comment } from '../../model/Comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getCustomerPosts(pageNumber: number, pageSize: number, customerId: number): Observable<PostResponse> {
    let url = `${environment.baseUrl}/${Paths.Post}`;
    const params = new HttpParams()
                        .set('pageNumber', pageNumber)
                        .set('pageSize', pageSize)
                        .set('customerId', customerId);
    return this.http.get<PostResponse>(url, { params: params });
  }

  commentPost(postId: number, text: string): Observable<Comment> {
    let url = `${environment.baseUrl}/${Paths.Post}/comment`;
    return this.http.post<Comment>(url, { text: text, postId: postId });
  }

  deleteComment(commentId: number): Observable<void> {
    let url = `${environment.baseUrl}/${Paths.Post}/comment/${commentId}`;
    return this.http.delete<void>(url);
  }
}
