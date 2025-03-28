import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RlpService {
  private apiUrl = 'https://your-api-endpoint.com/employee'; // ✅ Replace with actual API

  constructor(private http: HttpClient) {}

  getEmployeeData(empId: string): Observable<any> {
    console.log(`📡 Fetching Employee Data from API for ID: ${empId}`);

    return this.http.get<any>(`${this.apiUrl}/${empId}`);
  }
}
