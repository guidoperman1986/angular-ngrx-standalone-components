import { createSelector } from '@ngrx/store';
import { AuthState } from '../interfaces/auth-state.interface';
import { state } from '@angular/animations';

export const selectFeature = (state: { auth: AuthState }) => state.auth;

export const selectIsSubmitting = createSelector(
  selectFeature,
  (state) => state.isSubmitting
);
