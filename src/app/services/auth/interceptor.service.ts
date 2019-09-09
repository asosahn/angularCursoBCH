import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { retry, catchError, switchMap, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  isRefreshingToken = false;
  private refreshTokenEventSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private authService: AuthService, private toaster: ToastrService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneRequest = req.clone();
    if (this.authService.isLoggedIn() && cloneRequest.headers.get('intercept') !== 'false') {

      cloneRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` }
      });
    }
    if (cloneRequest.headers.get('intercept') === 'false') {
      cloneRequest = req.clone({
        headers: req.headers.delete('intercept')
      });
    }

    return next.handle(cloneRequest).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse && err.status === 401 && err.error.message === 'jwt expired') {
          return this.refreshToken(req, next);
        } else {
          return this.catchAllErrors(err);
        }
      })
    );
  }

  catchAllErrors = ( error: HttpErrorResponse ) => {
    if (error.status === 401 && error.error.message !== 'jwt expired') {
      if (this.router.url !== '/login' && this.router.url !== '/signup') {
        this.authService.logOut().subscribe();
      }
      this.toaster.error('Error!', error.error.message);
    }
    return throwError(error);
  }

  refreshToken( req: HttpRequest<any>, next: HttpHandler ) {
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

  addNewToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}
}

