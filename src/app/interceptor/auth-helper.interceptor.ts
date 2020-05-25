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
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthHelperInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _token = localStorage.getItem('access_token');
    if (_token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + _token
        }
      });
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });

    return next.handle(request).pipe(
      tap(),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500)
            this.router.navigateByUrl('/error500');
          else if (err.status === 404)
            this.router.navigateByUrl('/error404');
        }
        return of(err);
      })
    );
  }
}
