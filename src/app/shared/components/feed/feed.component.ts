import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectFeedData,
  selectIsLoading,
} from 'src/app/shared/feed-store/feed.reducer';
import { feedActions } from '../../feed-store/feed.actions';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { TagListComponent } from '../tag-list/tag-list.component';
import { FeedRequest } from '../../types/get-reed-response.interface';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 1;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiChanged) {
      this.fetchFeed()
    }
  }

  fetchFeed() {
    let splitedUrl: string[] | string = this.apiUrl;
    if (this.apiUrl.includes('tag')) {
      splitedUrl = this.apiUrl.split('?tag=');
    } else {
      splitedUrl = [this.apiUrl];
    }

    const feedRequest: FeedRequest = {
      url: splitedUrl[0],
      limit: 20,
      offset: this.currentPage * 20 - 20,
      tag: splitedUrl[1] !== undefined ? splitedUrl[1] : '',
    };

    this.store.dispatch(feedActions.getFeed({ feed: feedRequest }));
  }
}
