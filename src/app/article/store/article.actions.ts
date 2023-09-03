import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "src/app/shared/types/article.interace";

export const articleActions = createActionGroup({
    source: 'article',
    events: {
        'Load Article': props<{slug: string}>(),
        'Load Article Success': props<{article: ArticleInterface}>(),
        'Load Article Failure': emptyProps(),

        'Delete Article': props<{slug: string}>(),
        'Delete Article Success': emptyProps(),
        'Delete Article Failure': emptyProps(),
    }
})