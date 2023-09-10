import { Routes } from '@angular/router';
import { SettingsComponent } from './components/settings.component';
import { provideState } from '@ngrx/store';
import { settingsFeatureKey, settingsReducer } from './store/settings.reducer';

export const SettingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingsReducer)],
  },
];
