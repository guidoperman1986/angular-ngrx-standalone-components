import { BackendErrors } from 'src/app/shared/types/backend-errors.interface';

export interface CreateArticleState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
