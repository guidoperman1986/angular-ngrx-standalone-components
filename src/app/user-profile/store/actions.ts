import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfile } from '../types/user-profile.interface';

export const userProfileActions = createActionGroup({
  source: 'user profile',
  events: {
    'Get user profile': props<{ slug: string }>(),
    'Get user profile success': props<{ userProfile: UserProfile }>(),
    'Get user profile failure': emptyProps,
  },
});
