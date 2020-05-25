import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public subject;
  public user_id: Number;

  constructor(private http: HttpClient) {
    this.subject = new Subject;
  }

  getUsers(){
    return this.http.get("/api/users");
  }

  register(user: User): Observable<any>{
      return this.http.post("/api/register",user).pipe(
        catchError(this.handleError2<User[]>('register', []))
      );
  }

  login(user: User): Observable<any>{
    user.device_name="anything";
    return this.http.post("/api/login",JSON.stringify(user)).pipe(tap(ev => {
      const _token = ev.access_token;
      localStorage.setItem('access_token', _token);
      this.subject.next(true);
    }));
  }
  logout(){
    this.http.get('/api/LogoutUser');
    localStorage.removeItem('access_token');
    this.subject.next(false);
  }

  updateUser(userId, user: User): Observable<any> {
    return this.http.put("api/users/"+userId, user)
    .pipe(
      tap(()=>console.log(userId, user))
      ,catchError(this.handleError2<User[]>('updateUser', []))
    );
  }

  loggedIn(){
    if(localStorage.getItem('access_token')){
      return true;
    }
    return false;
  }

  getLoggedInUser(){
    return this.http.get('/api/LoggedInUser').pipe(map(val=>{
      this.user_id = val['id'];
      return val;
    }));
  }

  resetPassword(passowrds){
    return this.http.put(`/api/resetpassword/${this.user_id}`,passowrds);
  }

  private handleError2<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return throwError(error);
    };
  }

}
