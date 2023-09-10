import { CurrentUser } from './current-user.interface';

export interface CurrentUserRequest {
  user: CurrentUser & { password: string };
}
