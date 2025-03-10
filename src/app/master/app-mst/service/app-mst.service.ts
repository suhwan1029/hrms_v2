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
  private getDepartmentsUrl = 'https://your-api-url.com/get-departments'; // ✅ First URL for fetching
  private saveDepartmentUrl = 'https://your-api-url.com/save-department'; // ✅ Second URL for saving

  constructor(private http: HttpClient) {}

  // ✅ Fetch departments using the first URL
  getDepartments(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getDepartmentsUrl);
  }

  // ✅ Save department using the second URL
  saveDepartment(data: Department): Observable<any> {
    return this.http.post(this.saveDepartmentUrl, data);
  }
}
