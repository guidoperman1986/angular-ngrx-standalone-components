import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeedService } from 'src/app/shared/services/feed.service';
import { feedActions } from './feed.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FeedResponse } from 'src/app/shared/types/get-reed-response.interface';
import { of } from 'rxjs';

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({feed}) =>
        feedService.getFeed(feed).pipe(
          map((feed: FeedResponse) => {
            return feedActions.getFeedSuccess({ feed });
          }),
          catchError(() => of(feedActions.getFeedFailure()))
        )
      )
    );
  },
  { functional: true }
);
