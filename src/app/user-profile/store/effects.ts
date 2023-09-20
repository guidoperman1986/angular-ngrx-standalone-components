import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserProfileService } from "../services/user-profile.service";
import { userProfileActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { UserProfile } from "../types/user-profile.interface";

export const userProfileEffects = createEffect(
    (actions$ = inject(Actions), userProfileService = inject(UserProfileService)) => {
      return actions$.pipe(
        ofType(userProfileActions.getUserProfile),
        switchMap(({ slug }) =>
        userProfileService.getUserProfile(slug).pipe(
            map((userProfile: UserProfile) => {
              return userProfileActions.getUserProfileSuccess({ userProfile });
            }),
            catchError(() => of(userProfileActions.getUserProfileFailure()))
          )
        )
      );
    },
    { functional: true }
  );
  