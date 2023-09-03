import { createFeature, createReducer, on } from '@ngrx/store';
import { ArticleState } from 'src/app/shared/types/artcile-state.interface';
import { articleActions } from './article.actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: ArticleState = {
  isLoading: false,
  error: null,
  data: null,
};

export const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleActions.loadArticle, (state) => ({ ...state, isLoading: true })),
    on(articleActions.loadArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.article,
    })),
    on(articleActions.loadArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectIsLoading,
  selectError,
  selectData: selectArticleData,
} = articleFeature;
