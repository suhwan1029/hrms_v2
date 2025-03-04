
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeptMstService {
  private apiUrl = 'https://your-api-endpoint.com/dept-mst'; // 🔹 Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Create a new department
  createDepartment(departmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, departmentData);
  }

  // Update an existing department (Fix: Accept departmentId separately)
  updateDepartment(departmentId: string, departmentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${departmentId}`, departmentData);
  }

  // Get department by ID
  getDepartmentById(departmentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${departmentId}`);
  }
}
