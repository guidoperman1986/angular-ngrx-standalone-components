import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../interfaces/register.interface';
import { Observable, map } from 'rxjs';
import { CurrentUser } from 'src/app/shared/types/current-user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { LoginRequest } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponse): CurrentUser {
    return response.user;
  }

  register(data: RegisterRequest): Observable<CurrentUser> {
    const url = 'http://api.realworld.io/api/users';

    return this.http.post<AuthResponse>(url, data).pipe(map(this.getUser));
  }

  login(data: LoginRequest): Observable<CurrentUser> {
    const url = 'http://api.realworld.io/api/users/login';

    return this.http.post<AuthResponse>(url, data).pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUser> {
    const url = 'http://api.realworld.io/api/user';

    return this.http.get<AuthResponse>(url).pipe(map(this.getUser));
  }
}
