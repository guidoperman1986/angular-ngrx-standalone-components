import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddToFavoritesService } from '../services/add-to-favorites.service';
import { addToFavoritesActions } from './actions';
import { switchMap, catchError, of, map } from 'rxjs';
import { ArticleInterface } from '../../../types/article.interace';

export const AddToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    favoritesService = inject(AddToFavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? favoritesService.removeFromFavorites(slug)
          : favoritesService.addToFavorites(slug);

        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({ article });
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
