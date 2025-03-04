import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
  orgId: string;
  departmentId: string;
  departmentCode: string;
  departmentName: string;
  hodName: string;
  enableFlag: 'Yes' | 'No';
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'https://your-api-endpoint.com/department-list'; // ✅ Replace with actual API URL

  constructor(private http: HttpClient) {}

  // ✅ Fetch all departments
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  // ✅ Get department by ID
  getDepartmentById(departmentId: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${departmentId}`);
  }

  // ✅ Create new department
  createDepartment(department: Department): Observable<any> {
    return this.http.post(this.apiUrl, department);
  }

  // ✅ Update existing department
  updateDepartment(departmentId: string, department: Department): Observable<any> {
    return this.http.put(`${this.apiUrl}/${departmentId}`, department);
  }

  // ✅ Delete department
  deleteDepartment(departmentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${departmentId}`);
  }
}
