import { BackendErrors } from "src/app/shared/types/backend-errors.interface";
import { CurrentUser } from "src/app/shared/types/current-user.interface";

export interface AuthState {
    isSubmitting: boolean;
    currentUser: CurrentUser | null | undefined,
    isLoading: boolean;
    validationErrors: BackendErrors | null;
}