import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { userProfileActions } from '../../store/actions';
import { combineLatest, filter, map, tap } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../../store/reducer';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { CurrentUser } from 'src/app/shared/types/current-user.interface';
import { UserProfile } from '../../types/user-profile.interface';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FeedComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);
  slug: string = '';

  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter((currentUser): currentUser is CurrentUser =>
          Boolean(currentUser)
        )
      ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfile => Boolean(userProfile))
    ),
  }).pipe(
    tap((data) => console.log(data)),
    map(({ currentUser, userProfile }) => {
      return currentUser.username === userProfile.username;
    })
  );

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile() {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');

    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }
}
