import { Injectable } from '@angular/core';
import { UserProfile } from '../types/user-profile.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GetUserProfileResponse } from '../types/get-user-profile-response.interface';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfile> {
    const url = `https://api.realworld.io/api/profiles/${slug}`;

    return this.http
      .get<GetUserProfileResponse>(url)
      .pipe(map((response) => response.profile));
  }
}
