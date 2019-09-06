import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
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
      catchError(this.catchAllErrors)
    );
  }

  catchAllErrors = ( error: HttpErrorResponse ): Observable<any> => {
    if (error.status === 401) {
      if (this.router.url !== '/login' && this.router.url !== '/signup') {
        this.authService.logOut().subscribe();
      // } else {
      //   this.toaster.error('Error!', error.error.message);
      // }
      }
      this.toaster.error('Error!', error.error.message);
    }
    return throwError(error);
  }
}
