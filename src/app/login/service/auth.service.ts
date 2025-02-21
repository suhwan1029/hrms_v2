import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://your-backend-url/api/login'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<{ message: string; UserId: string; status: boolean; role: string; menu: string }> {
    return this.http.post<{ message: string; UserId: string; status: boolean; role: string; menu: string }>(this.apiUrl, credentials);
  }
}
