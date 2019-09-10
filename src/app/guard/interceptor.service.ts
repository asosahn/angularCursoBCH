import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, switchMap, filter, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  isRefreshingToken = false;
  refreshTokenEventSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneRequest = req.clone();
    console.log('paso por interceptor');
    // si el header tiene intecertp false no entra a colocar el token
    if (this.authService.isLoggedIn() && cloneRequest.headers.get('intercept') !== 'false') {
      cloneRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` }
      });
    }
    // para quitar el header intercept
    if (cloneRequest.headers.get('intercept') === 'false') {
      cloneRequest = req.clone({
        headers: req.headers.delete('intercept')
      });
    }
    return next.handle(cloneRequest)
      .pipe(
        // retry(1),
        // 401 message jwt expired
        catchError((err: HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse && err.status === 401
            && err.error.message === 'jwt expired') {
            console.log('token expirado');
            return this.refreshToken(req, next);
          } else {
            return this.catchAllError(err);
          }
        })
      );
  }
  refreshToken(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.refreshTokenEventSubject.next(null);
      return this.authService.refreshToken()
      .pipe(
        switchMap((token: any) => {
          this.isRefreshingToken = false;
          this.refreshTokenEventSubject.next(token.auth.token);
          return next.handle(this.addNewToken(req, token.auth.token));
        })
      );
    } else {
      return this.refreshTokenEventSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(newToken => {
          return next.handle(this.addNewToken(req, newToken));
        })
      );
    }
  }
  addNewToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  catchAllError = (error: HttpErrorResponse): Observable<any> => {
    if (error.status === 401 && error.error.message !== 'jwt expired') {
      if (this.router.url !== '/login' && this.router.url !== '/signup') {
        this.authService.logOut().subscribe();
      }
    }
    this.toastr.error(error.error.message, 'Error');
    return throwError(error);
  }
}
