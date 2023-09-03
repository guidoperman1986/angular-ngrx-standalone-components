import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ArticleInterface } from '../../shared/types/article.interace';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  http = inject(HttpClient);

  getArticle(slug: string): Observable<ArticleInterface> {
    const url = `https://api.realworld.io/api/articles/${slug}`;

    return this.http
      .get<{ article: ArticleInterface }>(url)
      .pipe(map(({ article }) => article));
  }

  deleteArticle(slug: string) {
    const url = `https://api.realworld.io/api/articles/${slug}`;

    return this.http.delete(url);
  }
}
