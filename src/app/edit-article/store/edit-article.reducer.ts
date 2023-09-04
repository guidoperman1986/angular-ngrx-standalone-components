import { routerNavigatedAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { EditArticleState } from '../types/edit-article-state.interface';
import { editArticleActions } from './edit-article.actions';

const initialState: EditArticleState = {
  isSubmitting: false,
  validationErrors: null,
  article: null,
  isLoading: false
};

export const editArticleFeature = createFeature({
  name: 'edit article',
  reducer: createReducer(
    initialState,
    on(editArticleActions.getArticle, (state) => ({ ...state, isLoading: true})),
    on(editArticleActions.getArticleSuccess, (state, action) => ({ ...state, isLoading: false, article: action.article})),
    on(editArticleActions.getArticleFailure, (state) => ({ ...state, isLoading: false})),

    on(editArticleActions.editArticle, (state) => ({ ...state, isSubmitting: true })),
    on(editArticleActions.editArticleSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(editArticleActions.editArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle
} = editArticleFeature;
