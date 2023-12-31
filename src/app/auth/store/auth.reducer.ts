import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../interfaces/auth-state.interface';
import { authActions } from './auth.actions';
import { CurrentUser } from '../../shared/types/current-user.interface';
import { routerNavigatedAction } from '@ngrx/router-store';

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
      isSubmitting: false,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoading: false,
      validationErrors: action.errors,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      isLoading: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoading: false,
      validationErrors: action.errors,
    })),

    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),
    on(authActions.updateCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.updateCurrentUserFailure, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: null,
      validationErrors:  action.errors
    })),
    on(routerNavigatedAction, (state) => ({ ...state, validationErrors: null })),
    on(authActions.logout, state => ({
      ...state,
      ...initialState,
      currentUser: null
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
