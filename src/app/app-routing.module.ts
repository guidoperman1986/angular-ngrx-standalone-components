import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalFeedComponent } from './global-feed/components/global-feed/global-feed.component';

export const appRoutes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/global-feed/global-feed.routes').then(
        (m) => m.GlobalFeedRoutes
      ),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('src/app/your-feed/your-feed.routes').then(
        (m) => m.GlobalFeedRoutes
      ),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('src/app/tag-feed/tag-feed.routes').then(
        (m) => m.TagFeedRoutes
      ),
  },
];

/* @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
 */
