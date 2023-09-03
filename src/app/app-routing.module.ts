import { Routes } from '@angular/router';

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
  {
    path: 'articles/new',
    loadChildren: () =>
      import('src/app/create-article/create-article.routes').then(
        (m) => m.CreateArticleRoutes
      ),
  },
  {
    path: 'article/:slug',
    loadChildren: () =>
      import('src/app/article/article.routes').then(
        (m) => m.ArticleRoutes
      ),
  },  
];

/* @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
 */
