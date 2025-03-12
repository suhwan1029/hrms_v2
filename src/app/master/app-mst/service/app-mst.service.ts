import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse {
  status: string;
  data: Department[];
}

interface Department {
  departmentId: number;
  departmentCode: string;
  departmentName: string;
  enableFlag: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppMstService {
  private getDepartmentsUrl = 'http://localhost:9095/approvalMaster'; // ✅ First URL for fetching
 

  constructor(private http: HttpClient) {}

  // ✅ Fetch departments using the first URL
  getDepartments(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.getDepartmentsUrl}/approval`);
  }
  

  saveDepartment(data: Department): Observable<any> {
    return this.http.post(`${this.getDepartmentsUrl}/departmentCodeList`, data);
  }
  
}

