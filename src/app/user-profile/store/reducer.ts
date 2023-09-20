import { createFeature, createReducer, on } from "@ngrx/store";
import { UserProfile } from "../types/user-profile.interface";
import { userProfileActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";

export interface UserProfileState {
    data: UserProfile | null,
    isLoading: boolean;
    error: string | null;
}

const initialState: UserProfileState = {
  isLoading: false,
  error: null,
  data: null,
};

export const userProfileFeature = createFeature({
  name: 'user profile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({ ...state, isLoading: true })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectData: selectUserProfileData,
} = userProfileFeature;

