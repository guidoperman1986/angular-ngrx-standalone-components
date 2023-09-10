import { BackendErrors } from "src/app/shared/types/backend-errors.interface";

export interface SettingsState {
    isSubmitting: boolean;
    validationErrors: BackendErrors | null;
}