import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormValues } from 'src/app/shared/types/article-form-values.interface';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/create-article.reducer';
import { ArticleRequest } from 'src/app/shared/types/article-request.interface';
import { createArticleActions } from '../../store/create-article.actions';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  store = inject(Store);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  onSubmit(articleFormValues: ArticleFormValues) {
    const request: ArticleRequest = {
      article: articleFormValues,
    };

    this.store.dispatch(
      createArticleActions.createArticle({ request })
    );
  }
}
