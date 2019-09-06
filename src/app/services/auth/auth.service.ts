import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
const URL = 'http://bch.hazsk.com/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser: any;
  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private router: Router) { }

  storeTokens(tokens: any) {
    localStorage.setItem('btoken', tokens.token);
    localStorage.setItem('bRefresh', tokens.refreshToken);
  }

  doLogginUser(user: any, tokens: any) {
    const preUser = { ...user };
    delete preUser.auth;
    this.loggedUser = preUser;
    this.storeTokens(tokens);
  }

  login(user: any) {
    return this.http.post<any>(`${URL}/login`, user)
    .pipe(
      tap(userWithToken => this.doLogginUser(userWithToken, userWithToken.auth)),
      mapTo(true),
      catchError(this.catchErrors)
    );
  }

  getToken(): string {
    // if (!this.loggedUser && localStorage.getItem('btoken')) {
    //   this.loggedUser = JSON.parse(atob(localStorage.getItem('btoken').split('.')[1]));
    // }
    return localStorage.getItem('btoken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  removeTokens() {
    localStorage.removeItem('btoken');
    localStorage.removeItem('bRefresh');
  }

  executeLogOut() {
    this.removeTokens();
    this.loggedUser = undefined;
    this.router.navigate(['/login']);

  }

  logOut() {
    const self = {...this};
    return this.http.post<any>(`${URL}/logout`, { refreshToken: localStorage.getItem('bRefresh') })
    .pipe(
      tap(() => this.executeLogOut()),
      mapTo(true),
      catchError(this.catchErrors.bind(self))
    );
  }

  catchErrors = ( error: HttpErrorResponse ): Observable<any>  => {
    // this.toastr.error('Error!', error.error.message);
    return throwError(error);
  }
}
