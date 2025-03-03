import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeptMstService {
  private apiUrl = 'https://your-backend-api.com/api/dept'; // Replace with actual API

  constructor(private http: HttpClient) {}

  // Fetch department details
  getDepartmentDetails(deptCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${deptCode}`);
  }

  // Update department details
  updateDepartmentDetails(updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${updatedData.departmentCode}`, updatedData);
  }
}
