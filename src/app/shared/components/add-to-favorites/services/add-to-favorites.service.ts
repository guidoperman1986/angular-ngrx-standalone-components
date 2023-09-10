import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleInterface } from '../../../types/article.interace';
import { HttpClient } from '@angular/common/http';
import { ArticleResponseInterface } from '../../../types/article-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  http = inject(HttpClient);

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    console.log(url);

    return this.http
      .post<ArticleResponseInterface>(url, {})
      .pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    return this.http
      .delete<ArticleResponseInterface>(url)
      .pipe(map(this.getArticle));
  }

  getUrl(slug: string): string {
    return `https://api.realworld.io/api/articles/${slug}/favorite`;
  }

  getArticle(response: ArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
