import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://your-api-endpoint/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    console.log('Fetching employee data...');
    return this.http.get<any>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<any> {
    console.log(`Fetching details for employee ID: ${id}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employeeData: any): Observable<any> {
    console.log('Adding new employee:', employeeData);
    return this.http.post<any>(this.apiUrl, employeeData);
  }

  updateEmployee(id: number, employeeData: any): Observable<any> {
    console.log(`Updating employee ID: ${id}`, employeeData);
    return this.http.put<any>(`${this.apiUrl}/${id}`, employeeData);
  }

  deleteEmployee(id: number): Observable<any> {
    console.log(`Deleting employee ID: ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
