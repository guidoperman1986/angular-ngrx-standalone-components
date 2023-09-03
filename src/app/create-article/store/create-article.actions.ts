import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleRequest } from 'src/app/shared/types/article-request.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interace';
import { BackendErrors } from 'src/app/shared/types/backend-errors.interface';

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create Article': props<{ request: ArticleRequest }>(),
    'Create Article Success': props<{ article: ArticleInterface }>(),
    'Create Article Failure': props<{ errors: BackendErrors }>(),
  },
});
