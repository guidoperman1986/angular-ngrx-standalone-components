import { createFeature, createReducer, on } from '@ngrx/store';
import { SettingsState } from '../types/settings-state.interface';
import { authActions } from 'src/app/auth/store/auth.actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: SettingsState = {
  isSubmitting: false,
  validationErrors: null,
};

const settingFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.updateCurrentUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.updateCurrentUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectValidationErrors,
  selectIsSubmitting,
} = settingFeature;
