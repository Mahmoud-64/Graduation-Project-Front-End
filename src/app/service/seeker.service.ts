import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Seeker } from '../models/seeker';
import { catchError, map, tap } from 'rxjs/operators';

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
  updateSeeker(seekerId, seeker): Observable<any> {
    return this.http.put(this.seekersUrl+seekerId, seeker)
    .pipe(
      catchError(this.handleError<Seeker[]>('updateSeeker', []))
    );
  }

  updateCv(selfile, changed_user_id, callback?) {
    let xhr = new XMLHttpRequest();
    let form = new FormData();
    let token = localStorage.getItem('access_token');
    form.append('cv', selfile, selfile.name);
    xhr.onload = (e) =>{
      console.log('file uploaded');
    };
    xhr.onreadystatechange = function() {
      console.log('readyState', xhr.readyState);
      if (xhr.readyState === 4) {
        callback(xhr.response);
      }
    }
    xhr.open('POST', "http://localhost:8000/api/seekers/uploadcv/"+changed_user_id, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send(form);
  }

  deleteSeeker(seekerId): Observable<Seeker>{
    return this.http.delete<Seeker>(this.seekersUrl+seekerId);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return throwError(error);
    };
  }

}
