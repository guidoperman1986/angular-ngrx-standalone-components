import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EditArticleService } from '../service/edit-article.service';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { editArticleActions } from './edit-article.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleInterface } from 'src/app/shared/types/article.interace';
import { ArticleService } from 'src/app/article/services/article.service';

export const articleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({ slug }) =>
        articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.getArticleSuccess({ article });
          }),
          catchError(() => of(editArticleActions.getArticleFailure()))
        )
      )
    );
  },
  { functional: true }
);

export const updateArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    createArticleService = inject(EditArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.editArticle),
      switchMap(({ request, slug }) =>
        createArticleService.updateArticle(slug, request).pipe(
          map((article: ArticleInterface) =>
            editArticleActions.editArticleSuccess({ article })
          ),
          catchError((errorsResponse: HttpErrorResponse) =>
            of(
              editArticleActions.editArticleFailure({
                errors: errorsResponse.error.errors,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const redirectAfterUpdateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(editArticleActions.editArticleSuccess),
      delay(1000),
      tap(({ article }) => {
        router.navigateByUrl(`/article/${article.slug}`);
      })
    );
  },
  { functional: true, dispatch: false }
);
