import { Route } from '@angular/router';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { EditArticleService } from './service/edit-article.service';
import * as editArticleEffects from './store/edit-article.effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  editArticleFeatureKey,
  editArticleReducer,
} from './store/edit-article.reducer';

export const EditArticleRoutes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
];
