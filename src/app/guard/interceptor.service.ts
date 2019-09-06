import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneRequest = req.clone();
    if (this.authService.isLoggedIn()) {
      cloneRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` }
      });
    }
    return next.handle(cloneRequest)
    .pipe(
      retry(1),
      catchError(this.catchAllError)
    );
  }
  catchAllError = (error: HttpErrorResponse): Observable<any> => {
    if (error.status === 401) {
      if (this.router.url !== '/login') {
        this.authService.logOut().subscribe();
      } else {
        //
      }
    }
    return throwError(error);
  }
}
