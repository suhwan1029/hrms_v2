import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupMstService {
  private apiUrl = 'http://your-backend-url/api/lookups'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all lookup entries
  getLookups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new lookup entry
  addLookup(lookupData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, lookupData);

  }

  // Update lookup entry (Ensuring ID exists)
  updateLookup(lookupData: any): Observable<any> {
    if (!lookupData.id) {
      throw new Error('Lookup entry must have an ID for update.');
    }
    return this.http.put<any>(`${this.apiUrl}/${lookupData.id}`, lookupData);
  }

  // Delete lookup entry
  deleteLookup(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
