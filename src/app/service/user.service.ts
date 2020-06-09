import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = null;
  private loggedInFlag: Boolean= false;
  public subject;
  public verifyEmailSubject;
  public user_id: Number;
  public spinner: Boolean = false;

  constructor(private http: HttpClient) {
    this.subject = new Subject;
    this.verifyEmailSubject = new Subject;
  }

  showSpinner(){
    this.spinner = true;
  }

  hideSpinner(){
    this.spinner = false;
  }

  getUsers(): Observable<any>{
    return this.http.get("/api/users");
  }

  register(user: User): Observable<any>{
      return this.http.post("/api/register",user).pipe(
        tap(data=>{
          this.verifyEmailSubject.next(data['verify_email']);
        }),
        catchError(this.handleError2<User[]>('register', []))
      );
  }

  login(user: User): Observable<any>{
    user.device_name="anything";
    this.showSpinner();
    return this.http.post("/api/login",JSON.stringify(user)).pipe(
      tap(ev => {
        this.user = ev;
        if (ev.role!="employee" && ev.role!="super-admin")
        {
          this.verifyEmailSubject.next(ev.verify_email);
        }
        else
        {
          this.verifyEmailSubject.next(true);
        }
        const _token = ev.access_token;
        localStorage.setItem('access_token', _token);
        this.hideSpinner();
        this.subject.next(true);
    }),
    catchError(this.handleError2<User[]>('register', []))
  );
  }
  logout(){
    this.http.get('/api/LogoutUser');
    localStorage.removeItem('access_token');
    this.user = null;
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

  getLoggedInUser(): Observable<any>{
    return this.http.get('/api/LoggedInUser').pipe(map(val=>{
      if(val["data"]){
        this.user = val["data"];
        this.user_id = val["data"]['id'];
        return val["data"];
      }
      return false;

    }));
  }

  getUser()
  {
    return this.user;
  }

  getUserRole()
  {
      if(this.loggedIn() && this.user)
      {
        if (this.user.role == "super-admin") return (Role.superadmin);
        else if (this.user.role == "employee") return (Role.employee);
        else if (this.user.role == "seeker") return (Role.seeker);
      }
      return (0);
  }

  hasRole(): Observable<Number>
  {
    return this.getLoggedInUser().pipe(map(user=>{
      console.log("check logged in ", this.loggedIn() , user);
      if(this.loggedIn() && user)
      {
        if (user.role == "super-admin") return (Role.superadmin);
        else if (user.role == "employee") return (Role.employee);
        else if (user.role == "seeker") return (Role.seeker);
      }
      return (0);
    }))
  }

  resetPassword(passowrds){
    return this.http.put(`/api/resetpassword/${this.user_id}`,passowrds);
  }

  private handleError2<T>(operation = 'operation', result?: T) {

    this.hideSpinner();
    return (error: any): Observable<T> => {
      return throwError(error);
    };
  }

}
