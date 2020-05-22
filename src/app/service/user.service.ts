import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get("/api/users");
  }

  register(){
      _token: String;
      return this.http.post("/api/register",JSON.stringify({
      name:"twins216",
      email:"twins216@gmail.com",
      password:"12345678",
      password_confirmation:"12345678"
    })).pipe(tap(ev => console.log(ev)));
  }

  login(){
    return this.http.post("/api/login",{
      name:"twins214",
      email:"twins214@gmail.com",
      password:"12345678",
      password_confirmation:"12345678",
      device_name: "fffff"
    }, {responseType: 'text'}).pipe(tap(ev => {
      const _token = JSON.parse(ev).access_token;
      localStorage.setItem('access_token', _token);
    }));
  }
  logout(){
    return this.http.get('/api/LogoutUser');
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
