import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUser } from 'src/app/shared/types/current-user.interface';
import { RegisterRequest } from '../interfaces/register.interface';
import { BackendErrors } from 'src/app/shared/types/backend-errors.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequest }>(),
    'Register success': props<{ currentUser: CurrentUser }>(),
    'Register failure': props<{errors: BackendErrors}>(),
  },
});

/* export const register = createAction(
  '[Auth] Register',
  props<{ request: RegisterRequest }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ request: RegisterRequest }>()
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ request: RegisterRequest }>()
);
 */
