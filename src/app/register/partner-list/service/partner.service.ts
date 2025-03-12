import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ApiResponse {
  status: string;
  data: Partner[];
}

export interface Partner {
  partnerId: string;
  partnerName: string;
  partnerEmail: string;
  contactPerson: string;
  contactNumber: string;
  address: string;
  status: 'Active' | 'Inactive';
}

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private apiUrl = 'https://your-api-endpoint.com/partner-list'; // ✅ Replace with actual API URL

  constructor(private http: HttpClient) {}

  // ✅ Fetch all partners
  getPartners(): Observable<Partner[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.data) // ✅ Extract `data` field from `ApiResponse`
    );
  }

  // ✅ Get partner by ID
  getPartnerById(partnerId: string): Observable<Partner> {
    return this.http.get<Partner>(`${this.apiUrl}/${partnerId}`);
  }

  // ✅ Create new partner
  createPartner(partner: Partner): Observable<any> {
    return this.http.post(this.apiUrl, partner);
  }

  // ✅ Update existing partner
  updatePartner(partnerId: string, partner: Partner): Observable<any> {
    return this.http.put(`${this.apiUrl}/${partnerId}`, partner);
  }

  // ✅ Delete partner
  deletePartner(partnerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${partnerId}`);
  }
}
