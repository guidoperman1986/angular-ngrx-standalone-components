import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleRequest } from 'src/app/shared/types/article-request.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interace';
import { BackendErrors } from 'src/app/shared/types/backend-errors.interface';

export const editArticleActions = createActionGroup({
  source: 'edit article',
  events: {
    'Get Article': props<{ slug: string }>(),
    'Get Article Success': props<{ article: ArticleInterface }>(),
    'Get Article Failure': emptyProps(),

    'Edit Article': props<{ request: ArticleRequest, slug: string }>(),
    'Edit Article Success': props<{ article: ArticleInterface }>(),
    'Edit Article Failure': props<{ errors: BackendErrors }>(),
  },
});
