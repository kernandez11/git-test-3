import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterPayload } from './register-payload';
import { Observable } from 'rxjs';
import { LoginPayload } from './login-payload';
import { JwtAuthResponse } from './jwt-auth-response';
import { map } from 'rxjs/operators';      
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://chat-official-maryn.herokuapp.com/api/auth/';


  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService ) { }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(loginPayload: LoginPayload):Observable<any> {
    return this.httpClient.post<JwtAuthResponse>(this.url + 'login', 
       loginPayload).pipe(map(data => {
       this.localStorageService.store('authenticationToken', data.authenticationToken);
       this.localStorageService.store('username', data.username);
       return true;
    }), catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
     return throwError(error.message || "Server error");
  }

  isAuthenticated(): Boolean{
    return this.localStorageService.retrieve('username') != null;  
  }

  logout(){
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
  }
}


