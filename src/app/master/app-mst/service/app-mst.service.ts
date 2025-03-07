import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppMstService {
  private apiUrl = 'https://your-api-url.com/departments'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveDepartment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, data);
  }
}
