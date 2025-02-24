import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private apiUrl = 'https://your-api-endpoint.com/partners'; // 🔹 Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to save partner details
  savePartner(partnerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, partnerData);
  }

  // Method to get partner details by ID
  getPartnerById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
