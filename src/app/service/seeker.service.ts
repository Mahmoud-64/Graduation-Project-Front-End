import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Seeker } from '../models/seeker';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {
  private seekersUrl = '/api/seekers/';  // URL to web api
  constructor(private http: HttpClient) { }


  getSeekers(): Observable<Seeker>{
    return this.http.get<Seeker>(this.seekersUrl);
  }
  getSeeker(seekerId): Observable<Seeker>{
    return this.http.get<Seeker>(this.seekersUrl+seekerId);
  }
  updateSeeker(seekerId, seeker: Seeker): Observable<any> {
    return this.http.put(this.seekersUrl+seekerId, seeker);
  }
}
