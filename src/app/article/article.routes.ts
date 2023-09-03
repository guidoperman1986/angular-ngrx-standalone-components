import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { ArticleComponent } from './components/article.component';

import { provideState } from '@ngrx/store';
import * as articleEffects from './store/article.effects';
import { articleFeatureKey, articleReducer } from './store/article.reducer';

export const ArticleRoutes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
];
