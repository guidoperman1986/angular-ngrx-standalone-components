import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { PopularTagsComponent } from 'src/app/shared/components/popular-tags/popular-tags.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feed-toggler/feed-toggler.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  imports: [
    CommonModule,
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
})
export class TagFeedComponent implements OnInit {
  
  apiUrl = '';
  tagName: string = ''

  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = '/articles?tag='+this.tagName;
    })
  }
}
