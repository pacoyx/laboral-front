import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);

  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
console.log('run interceptor');

      console.log('req.url=>',req.url);
      if(req.url.includes('google') || req.url.includes('validateToken')){
        return next.handle(req);
      }
       
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    const token = objLogin.token;

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          localStorage.removeItem('laboral.ai');          
          this.router.navigateByUrl('/home');
        }

        return throwError(err);
      })
    );
  }
}
