import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const URL_AUTH = 'http://bch.hazsk.com/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser: any;
  constructor(private http: HttpClient,
              private router: Router) { }
  // guardar tokens en localStorage
  storeTokens(tokens: any) {
    localStorage.setItem('btoken', tokens.token);
    localStorage.setItem('bRefresh', tokens.refreshToken);
  }
  // setear el usuario que viene del request de login y guardar los tokens
  doLogginUser(user: any, tokens: any) {
    const preUser = { ...user };
    delete preUser.auth;
    this.loggedUser = preUser;
    this.storeTokens(tokens);
  }
  login(user: any) {
    return this.http.post<any>(`${URL_AUTH}/login`, user)
    .pipe(
      tap((userWithTokens: any) => this.doLogginUser(userWithTokens, userWithTokens.auth)),
      mapTo(true),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  getToken(): string {
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
    // mandar a la ruta login
    this.router.navigate(['/login']);
  }
  logOut() {
    return this.http.post<any>(`${URL_AUTH}/logout`, {
      refreshToken: localStorage.getItem('bRefresh')
     })
     .pipe(
       tap(() => this.executeLogOut()),
       mapTo(true),
       catchError((err: HttpErrorResponse) => {
         console.log(err);
         return throwError(err);
       })
     );
  }

  signUp(user: any) {
    return this.http.post<any>(`${URL_AUTH}/create`, user)
    .pipe(
      tap((userWithTokens: any) => this.doLogginUser(userWithTokens, userWithTokens.auth)),
      mapTo(true),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

}
