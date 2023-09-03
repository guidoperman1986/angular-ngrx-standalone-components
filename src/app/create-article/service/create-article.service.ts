import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ArticleRequest } from 'src/app/shared/types/article-request.interface';
import { Observable, map, tap } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interace';
import { ArticleResponseInterface } from 'src/app/shared/types/article-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  http = inject(HttpClient);

  createArticle(articleRequest: ArticleRequest): Observable<ArticleInterface> {
    const url = 'https://api.realworld.io/api/articles';

    return this.http
      .post<ArticleResponseInterface>(url, articleRequest)
      .pipe(map((response) => response.article));
  }
}
