import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeptMstService {
  private apiUrl = 'https://your-backend-api.com/api/dept'; // Replace with actual backend API URL

  constructor(private http: HttpClient) {}

  // Fetch list of all departments for dropdown (LOV)
  getAllDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Fetch department details by department code
  getDepartmentDetails(deptCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${deptCode}`);
  }

  // Update department details
  updateDepartmentDetails(updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${updatedData.departmentCode}`, updatedData);
  }
}
