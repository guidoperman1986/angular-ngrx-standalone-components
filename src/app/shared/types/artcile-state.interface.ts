import { ArticleInterface } from "./article.interace";

export interface ArticleState {
    isLoading: boolean;
    error: string | null;
    data: ArticleInterface | null;
}