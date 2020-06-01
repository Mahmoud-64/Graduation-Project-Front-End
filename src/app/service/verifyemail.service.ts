import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyemailService {

  constructor(private http: HttpClient) {}

  resendEmailVerification(): Observable<any>
  {
    return this.http.get('/api/email/resend');
  }
}
