import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter } from 'rxjs';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { ArticleFormValues } from 'src/app/shared/types/article-form-values.interface';
import { ArticleRequest } from 'src/app/shared/types/article-request.interface';
import { editArticleActions } from '../../store/edit-article.actions';
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors
} from '../../store/edit-article.reducer';
import { map } from 'rxjs/operators';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ArticleInterface } from '../../../shared/types/article.interace';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  @Input() slug!: string;
  
  store = inject(Store);
  initialValues$: Observable<ArticleFormValues> = this.store.pipe(
    select(selectArticle), 
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList!,
      };
    })
  )
  
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    initialValues: this.initialValues$,
    isLoading: this.store.select(selectIsLoading)
  });
  
  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));

  }


  onSubmit(articleFormValues: ArticleFormValues) {
    const request: ArticleRequest = {
      article: articleFormValues,
    };

    this.store.dispatch(
      editArticleActions.editArticle({ request, slug: this.slug })
    );
  }
}
