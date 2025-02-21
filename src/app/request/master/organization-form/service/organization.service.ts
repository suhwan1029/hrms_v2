import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Service is available globally
})
export class OrganizationService {
  private baseUrl = 'http://your-api-url.com/api/organizations';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch all organizations
  getOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Fetch a single organization by ID
  getOrganizationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Create a new organization
  createOrganization(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  // Update an existing organization
  updateOrganization(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  // Delete an organization
  deleteOrganization(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
