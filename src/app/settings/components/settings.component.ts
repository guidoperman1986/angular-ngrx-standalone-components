import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { authActions } from 'src/app/auth/store/auth.actions';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { Subscription, combineLatest, filter } from 'rxjs';
import { CurrentUser } from 'src/app/shared/types/current-user.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../store/settings.reducer';
import { BackendErrorsComponent } from 'src/app/shared/components/backend-errors/backend-errors.component';
import { CurrentUserRequest } from 'src/app/shared/types/current-user-request.interface';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, BackendErrorsComponent, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });

  store = inject(Store);

  currentUser?: CurrentUser;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  currentUserSubscription = new Subscription();

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());

    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm() {
    if (!this.currentUser) throw new Error('User is not loaded');

    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  submit() {
    if (!this.currentUser) throw new Error('User is not loaded');

    const currentUserRequest: CurrentUserRequest = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };

    this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }));
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
