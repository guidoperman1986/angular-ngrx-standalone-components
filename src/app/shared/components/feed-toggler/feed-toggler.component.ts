import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-feed-toggler',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
})
export class FeedTogglerComponent {
  @Input() tagName?: string;

  store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);
}
