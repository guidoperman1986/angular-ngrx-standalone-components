import { ArticleInterface } from './article.interace';

export interface FeedRequest {
  url: string;
  limit: number;
  offset: number;
  tag?: string;
}

export interface FeedResponse {
  articles: ArticleInterface[];
  articlesCount: number;
}
