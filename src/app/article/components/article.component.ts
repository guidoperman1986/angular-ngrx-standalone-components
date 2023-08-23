import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../services/article.service';
import { Store } from '@ngrx/store';
import { articleActions } from '../store/article.actions';
import { combineLatest } from 'rxjs';
import { selectArticleData } from '../store/article.reducer';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articleService = inject(ArticleService);
  store = inject(Store);
  data$ = combineLatest({
    article: this.store.select(selectArticleData),
  });
  @Input() slug!: string;

  ngOnInit(): void {
    this.store.dispatch(articleActions.loadArticle({ slug: this.slug }));

  }
}
