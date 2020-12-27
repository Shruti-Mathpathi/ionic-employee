import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'https://5fe378908bf8af001766e700.mockapi.io/api/v1/employees';

  constructor(private http: HttpClient) {
  }

  createEmloyee(value): Observable<any> {
    return this.http.post(this.url, value).pipe(map(data => {
      return data;
    }))
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.url).pipe(map(data => {
      return data;
    }))
  }

  getEmployeeDetail(id): Observable<any> {
    return this.http.get(this.url + "/" + id).pipe(map(data => {
      return data;
    }))
  }

}
