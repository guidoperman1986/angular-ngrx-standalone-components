import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PopularTagsService } from '../services/popular-tags.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { popularTagsActions } from './popular-tags.actions';
import { PopularTagType } from '../types/popular-tag.interface';

export const getPopularTags = createEffect(
  (actions$ = inject(Actions), popularService = inject(PopularTagsService)) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() =>
        popularService.getPopularTags().pipe(
          map((tags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({ tags });
          }),
          catchError(() => of(popularTagsActions.getPopularTagsFailure()))
        )
      )
    );
  },
  { functional: true }
);
