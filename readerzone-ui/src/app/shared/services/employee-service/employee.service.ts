import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeByEmail(email: string): Observable<Employee> {
    let url = `${environment.baseUrl}/${Paths.Employee}/${email}`;
    return this.http.get<Employee>(url);
  }
}
