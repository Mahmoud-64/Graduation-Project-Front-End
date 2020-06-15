import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Seeker } from '../models/seeker';
import { UserService } from './user.service';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import Pusher from "../../../node_modules/pusher-js";
@Injectable({
  providedIn: 'root'
})
export class SeekerService {
  private seekersUrl = '/api/seekers/';  // URL to web api
  private VerifyPhoneUrl = '/api/checkphone';
  declare pusher: any;
  public messagesChannel;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: 'eu'
    });
    this.messagesChannel = this.pusher.subscribe('my-channel.'+this.userService.loginCache['id']);
    this.messagesChannel.bind('review-event', (message) => {  
    });
  }


  getSeekers(pageParam={}): Observable<Seeker> {
    return this.http.get<Seeker>(this.seekersUrl, {params: pageParam});
  }
  getSeeker(seekerId): Observable<Seeker> {
    return this.http.get<Seeker>(this.seekersUrl + seekerId);
  }
  updateSeeker(seekerId, seeker): Observable<any> {

    return this.http.put(this.seekersUrl + seekerId, seeker)
      .pipe(
        catchError(this.handleError<Seeker[]>('updateSeeker', []))
      );
  }

  createSeeker(seeker): Observable<any> {
    return this.http.post(this.seekersUrl, seeker)
      .pipe(
        catchError(this.handleError<Seeker[]>('createSeeker', []))
      );
  }

  downloadCV(seeker_id, cvName) {
    return this.http.get(`/api/seekers/downloadcv/${seeker_id}/${cvName}`);
  }

  updateCv(selfile, changed_user_id, callback?) {
    let xhr = new XMLHttpRequest();
    let form = new FormData();
    let token = this.userService._token;
    // let token = localStorage.getItem('access_token');
    form.append('cv', selfile, selfile.name);
    xhr.onload = (e) => {

    };
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(JSON.parse(xhr.response));
        } else {
          callback({ errors: "you must upload file of type pdf" });
        }
      }
    }
    xhr.open('POST', "http://localhost:8000/api/seekers/uploadcv/" + changed_user_id, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send(form);
  }

  deleteSeeker(seekerId): Observable<Seeker> {
    return this.http.delete<Seeker>(this.seekersUrl + seekerId);
  }
  verifyPhone(data) {
    return this.http.post<any>(this.VerifyPhoneUrl, data)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return throwError(error);
    };
  }

  public getNotification(){
    return this.http.get(`/api/notifications`);
  }

}
