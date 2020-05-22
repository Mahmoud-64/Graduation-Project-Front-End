import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get("/api/users");
  }

  register(user: User): Observable<any>{
      _token: String;
      return this.http.post("/api/register",JSON.stringify(user)).pipe(tap(ev => console.log(ev)));
  }

  login(user: User): Observable<any>{
    user.device_name="anything";
    return this.http.post("/api/login",JSON.stringify(user)).pipe(tap(ev => {
      const _token = ev.access_token;
      localStorage.setItem('access_token', _token);
    }));
  }
  logout(){
    this.http.get('/api/LogoutUser');
    localStorage.removeItem('access_token');
  }

  loggedIn(){
    if(localStorage.getItem('access_token')){
      return true;
    }
    return false;
  }

  getLoggedInUser(){
    return this.http.get('/api/LoggedInUser');
  }

}
