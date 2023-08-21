import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { BackendErrorsComponent } from 'src/app/shared/components/backend-errors/backend-errors.component';
import { AuthState } from '../../interfaces/auth-state.interface';
import { LoginRequest } from '../../interfaces/login.interface';
import { authActions } from '../../store/auth.actions';
import { selectIsSubmitting, selectValidationErrors } from '../../store/auth.reducer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, BackendErrorsComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  store = inject(Store<AuthState>);

  // isSubmitting$ = this.store.select(selectIsSubmitting);
  // backendErrors$ = this.store.select(selectValidationErrors);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })

  form = this.fb.nonNullable.group({
    email:    ['', Validators.required],
    password: ['', Validators.required],
  });

  register() {
    const request: LoginRequest = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));    
  }
}
