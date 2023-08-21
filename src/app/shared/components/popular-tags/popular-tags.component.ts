import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularTagsService } from '../../services/popular-tags.service';
import { Store } from '@ngrx/store';
import { popularTagsActions } from '../../store/popular-tags.actions';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectTags,
} from '../../store/popular-tags.reducer';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  store = inject(Store);

  data$ = combineLatest({
    tags: this.store.select(selectTags),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
