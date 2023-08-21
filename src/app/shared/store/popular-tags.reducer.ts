import { createFeature, createReducer, on } from '@ngrx/store';
import { popularTagsActions } from './popular-tags.actions';

interface TagsState {
  isLoading: boolean;
  tags: string[] | null;
  error: string | null;
}

const initialState: TagsState = {
  isLoading: false,
  error: null,
  tags: null,
};

const tagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(popularTagsActions.getPopularTags, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(popularTagsActions.getPopularTagsSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      error: null,
      tags: actions.tags,
    })),
    on(popularTagsActions.getPopularTagsFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: null,
    }))
  ),
});

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectTags,
  selectIsLoading,
  selectError
} = tagsFeature;
