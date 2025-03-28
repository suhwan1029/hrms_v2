import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RlfService {
  private apiUrl = 'https://your-api-endpoint.com/api/submit-rlf'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  submitRlfForm(formData: any): Observable<any> {
    console.log("Submitting Form Data to API:", formData); // ✅ Log data before sending

    return this.http.post(this.apiUrl, formData);
  }
   // Fetch all request letters
   getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Fetch a specific request letter by employee ID
  getRequestById(empId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${empId}`);
  }

}
