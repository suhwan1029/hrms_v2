import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RfrService {
  private apiUrl = 'http://your-api-url.com/api/rfr'; // Hardcoded API URL

  constructor(private http: HttpClient) {}

  /** 📌 Create a new RFR */
  createRfr(rfrData: any): Observable<any> {
    console.log(rfrData);
    return this.http.post(`${this.apiUrl}`, rfrData)
      .pipe(retry(2), catchError(this.handleError));
  }

  /** 📌 Fetch RFR details by ID */
  getRfrById(rfrNo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${rfrNo}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  /** 📌 Update an existing RFR */
  updateRfr(rfrNo: string, rfrData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${rfrNo}`, rfrData)
      .pipe(retry(2), catchError(this.handleError));
  }

  /** 📌 Delete an RFR */
  deleteRfr(rfrNo: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${rfrNo}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  /** 📌 Generic error handler */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong. Please try again later.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      console.error(`Server error (Code: ${error.status}):`, error.error);
      errorMessage = `Server error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
