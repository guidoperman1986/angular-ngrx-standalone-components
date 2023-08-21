import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { PopularTagType } from '../types/popular-tag.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  http = inject(HttpClient);

  getPopularTags(): Observable<PopularTagType[]> {
    const url = 'https://api.realworld.io/api/tags';

    return this.http
      .get<{ tags: PopularTagType[] }>(url)
      .pipe(map((popularTags) => popularTags.tags));
  }
}
