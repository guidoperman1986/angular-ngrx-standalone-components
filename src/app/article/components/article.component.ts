import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../services/article.service';
import { Store } from '@ngrx/store';
import { articleActions } from '../store/article.actions';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/article.reducer';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { TagListComponent } from 'src/app/shared/components/tag-list/tag-list.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articleService = inject(ArticleService);
  store = inject(Store);

  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(filter((currentUser) => currentUser !== undefined)),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false;
      }

      return article.author.username === currentUser.username;
    })
  );

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  });
  @Input() slug!: string;

  ngOnInit(): void {
    this.store.dispatch(articleActions.loadArticle({ slug: this.slug }));
  }

  deleteArticle() {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
