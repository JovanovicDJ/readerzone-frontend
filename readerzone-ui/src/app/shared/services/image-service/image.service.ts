import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  postImage(image: FormData): Observable<any> {
    let url = `${environment.baseUrl}/${Paths.Image}/upload`;
    return this.http.post<any>(url, image);
  }
}
