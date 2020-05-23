// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthHelperInterceptor implements HttpInterceptor {

//   constructor() { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log("interceptor",request.url);

//     request = request.clone({
//       setHeaders: {
//         'Content-Type': 'application/json',
//         withCredentials: "true"
//       }
//     });
//     return next.handle(request);
//   }
// }
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHelperInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _token = localStorage.getItem('access_token');
    if(_token){
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+_token
        }
      });
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });

    return next.handle(request);
  }
}
