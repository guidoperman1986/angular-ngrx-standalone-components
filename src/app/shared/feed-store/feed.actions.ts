import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FeedRequest, FeedResponse } from 'src/app/shared/types/get-reed-response.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    'Get Feed': props<{ feed: FeedRequest }>(),
    'Get Feed Success': props<{ feed: FeedResponse }>(),
    'Get Feed Failure': emptyProps(),
  },
});
