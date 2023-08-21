import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import * as authEffects from './app/auth/store/auth.effects';
import * as feedEffects from './app/shared/feed-store/feed.effects';
import * as tagsEffects from './app/shared/store/popular-tags.effects';
import { authFeatureKey, authReducer } from './app/auth/store/auth.reducer';
import { authInterceptor } from './app/shared/services/auth.interceptor';
import {
  feedFeatureKey,
  feedReducer,
} from './app/shared/feed-store/feed.reducer';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './app/shared/store/popular-tags.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ router: routerReducer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideEffects(authEffects),
    provideEffects(feedEffects),
    provideEffects(tagsEffects),
    provideRouterStore(),
    provideRouterStore(),
  ],
});
