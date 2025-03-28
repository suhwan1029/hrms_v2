import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ApiResponse {
  status: string;
  data: RFR[];
  message?: string;
}

export interface RFR {
  rfrId: string;
  organizationGroup: string;
  projectName: string;
  position: string;
  designation: string;
  experience: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class RfrListService {
  private apiUrl = 'https://your-api-endpoint.com/rfr-list'; // ✅ Replace with actual API URL

  constructor(private http: HttpClient) {}

  // ✅ Fetch all RFRs correctly
  getRFRList(): Observable<RFR[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  // ✅ Get RFR by ID
  getRFRById(rfrId: string): Observable<RFR> {
    return this.http.get<RFR>(`${this.apiUrl}/${rfrId}`);
  }

  // ✅ Create new RFR
  createRFR(rfr: RFR): Observable<any> {
    return this.http.post(this.apiUrl, rfr);
  }

  // ✅ Update existing RFR
  updateRFR(rfrId: string, rfr: RFR): Observable<any> {
    return this.http.put(`${this.apiUrl}/${rfrId}`, rfr);
  }

  // ✅ Delete RFR
  deleteRFR(rfrId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${rfrId}`);
  }
}
