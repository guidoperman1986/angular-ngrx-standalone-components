import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CreateArticleService } from '../service/create-article.service';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { createArticleActions } from './create-article.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleInterface } from 'src/app/shared/types/article.interace';

export const createArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    createArticleService = inject(CreateArticleService)
  ) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }) =>
        createArticleService.createArticle(request).pipe(
          map((article: ArticleInterface) =>
            createArticleActions.createArticleSuccess({ article })
          ),
          catchError((errorsResponse: HttpErrorResponse) =>
            of(
              createArticleActions.createArticleFailure({
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

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      delay(1000),
      tap(({ article }) => {
        router.navigateByUrl(`/article/${article.slug}`);
      })
    );
  },
  { functional: true, dispatch: false }
);
