import { ArticleInterface } from 'src/app/shared/types/article.interace';
import { BackendErrors } from 'src/app/shared/types/backend-errors.interface';

export interface EditArticleState {
  article: ArticleInterface | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
