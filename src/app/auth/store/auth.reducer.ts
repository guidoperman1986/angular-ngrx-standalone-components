import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../interfaces/auth-state.interface';
import { authActions } from './auth.actions';
import { CurrentUser } from '../../shared/types/current-user.interface';

const initialState: AuthState = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      isLoading: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: true,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoading: false,
      validationErrors: action.errors,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting /* instead creating specific selector, redux provides a way out of the box for this to create a selector */,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
