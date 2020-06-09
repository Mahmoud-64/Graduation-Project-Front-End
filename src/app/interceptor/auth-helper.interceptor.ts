import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthHelperInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _token = localStorage.getItem('access_token');
    if (_token) {
      // const urlsWithoutToken=[
      //   "/api/jobs",
      //   "/api/jobs/?"
      // ]
      // console.log(urlsWithoutToken.includes(request.url));

      if (_token && !(request.url.search('/jobs') !== -1 && request.method === "GET")) {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + _token
          }
        });
      }
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });

    return next.handle(request).pipe(
      retry(1),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500)
            this.router.navigateByUrl('/error500');
          else if (err.status === 404)
            this.router.navigateByUrl('/error404');
          // else if (err.status === 401)
          //   this.router.navigateByUrl('/login');
          else if (err.status === 403)
            this.router.navigateByUrl('/error403');
        }
        return throwError(err.error);
      })
    );
  }

}
