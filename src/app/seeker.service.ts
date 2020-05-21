import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {
  private seekersUrl = 'http://localhost:8000/api/seekers';  // URL to web api
  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getSeekers(){
    return this.http.get(this.seekersUrl)
  }
}
