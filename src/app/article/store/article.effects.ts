import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ArticleInterface } from 'src/app/shared/types/article.interace';
import { ArticleService } from '../services/article.service';
import { articleActions } from './article.actions';

export const articleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.loadArticle),
      switchMap(({ slug }) =>
        articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return articleActions.loadArticleSuccess({ article });
          }),
          catchError(() => of(articleActions.loadArticleFailure()))
        )
      )
    );
  },
  { functional: true }
);
