import { createFeature, createReducer, on } from '@ngrx/store';
import { ArticleState } from 'src/app/shared/types/artcile-state.interface';
import { routerNavigatedAction } from '@ngrx/router-store';
import { createArticleActions } from './create-article.actions';
import { CreateArticleState } from '../types/create-article-state.interface';

const initialState: CreateArticleState = {
  isSubmitting: false,
  validationErrors: null,
};

export const createArticleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state) => ({ ...state, isSubmitting: true })),
    on(createArticleActions.createArticleSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createArticleActions.createArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature;
