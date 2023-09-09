import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../model/Author';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    let url = `${environment.baseUrl}/${Paths.Author}`;
    return this.http.get<Author[]>(url);
  }

  addAuthor(author: object): Observable<Author> {
    let url = `${environment.baseUrl}/${Paths.Author}`;
    return this.http.post<Author>(url, author);
  }
}
