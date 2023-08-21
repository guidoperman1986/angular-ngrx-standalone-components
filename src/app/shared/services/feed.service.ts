import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FeedResponse,
  FeedRequest,
} from '../types/get-reed-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed({ url, limit, offset, tag }: FeedRequest): Observable<FeedResponse> {
    let fullUrl =
      'https://api.realworld.io/api' + url + `?limit=${limit}&offset=${offset}`;

    tag?.length! > 0 && (fullUrl += `&tag=${tag}`);

    return this.http.get<FeedResponse>(fullUrl);
  }
}
