import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../interfaces/register.interface';
import { Observable, map } from 'rxjs';
import { CurrentUser } from 'src/app/shared/types/current-user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<CurrentUser> {
    const url = 'http://api.realworld.io/api/users';

    return this.http
      .post<AuthResponse>(url, data)
      .pipe(map((response) => response.user));
  }
}
