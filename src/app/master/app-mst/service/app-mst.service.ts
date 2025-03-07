import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppMstService {
  private apiUrl = 'http://localhost:3000/approval'; // Replace with actual backend URL

  constructor(private http: HttpClient) {}

  // Save department details
  saveDepartment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, data);
  }
}
