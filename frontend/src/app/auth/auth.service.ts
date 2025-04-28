import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email:    string;
  password: string;
}

export interface SignupRequest {
  name:     string;
  email:    string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl  = 'http://localhost:8000/auth';
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload).pipe(
      tap(() => { this.loggedIn = true; })
    );
  }

  signup(payload: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, payload);
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
