import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { PopularTagType } from "../types/popular-tag.interface";

export const popularTagsActions = createActionGroup({
    source: 'Popular tags',
    events: {
        'Get Popular Tags': emptyProps(),
        'Get Popular Tags Success': props<{tags: PopularTagType[]}>(),
        'Get Popular Tags Failure': emptyProps(),
    }
})