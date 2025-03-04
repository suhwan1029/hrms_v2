import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})


export class  RfrService {
  private baseUrl = 'http://localhost:4200/rfr';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}


  // Create a new organization
  createOrganization(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

}