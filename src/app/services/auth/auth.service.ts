import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registred?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new Subject<User>()

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVanABTcVCSE66H43-VVICD8DHumC6fu4',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVanABTcVCSE66H43-VVICD8DHumC6fu4',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = "Um erro desconhecido aconteceu!";
      if(!errorRes.error || !errorRes.error.error) 
        return throwError(errorMessage);
      switch(errorRes.error.error.message){
        case "EMAIL_EXISTS":
          errorMessage = "Este email já existe!";
          break;
        case "EMAIL_NOT_FOUND":
          errorMessage = "As credenciais não estão corretas!";
          break
        case "INVALID_PASSWORD":
          errorMessage = "As credenciais não estão corretas!"
      }
      return throwError(errorMessage);
  }
}
