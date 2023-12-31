import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUser } from 'src/app/shared/types/current-user.interface';
import { RegisterRequest } from '../interfaces/register.interface';
import { BackendErrors } from 'src/app/shared/types/backend-errors.interface';
import { LoginRequest } from '../interfaces/login.interface';
import { CurrentUserRequest } from 'src/app/shared/types/current-user-request.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequest }>(),
    'Register success': props<{ currentUser: CurrentUser }>(),
    'Register failure': props<{ errors: BackendErrors }>(),

    Login: props<{ request: LoginRequest }>(),
    'Login success': props<{ currentUser: CurrentUser }>(),
    'Login failure': props<{ errors: BackendErrors }>(),

    'Get current user': emptyProps(),
    'Get current user success': props<{ currentUser: CurrentUser }>(),
    'Get current user failure': emptyProps(),

    'Update current user': props<{ currentUserRequest: CurrentUserRequest }>(),
    'Update current user success': props<{ currentUser: CurrentUser }>(),
    'Update current user failure': props<{ errors: BackendErrors }>(),

    Logout: emptyProps()
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
