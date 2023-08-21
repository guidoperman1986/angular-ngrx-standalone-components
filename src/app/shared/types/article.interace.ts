import { createAction } from '@ngrx/store';
import { Profile } from './profile.interface';
import { PopularTagType } from './popular-tag.interface';
export interface ArticleInterface {
    body          : string;
    createdAt     : string,
    description   : string,
    favorited     : boolean,
    favoritesCount: number,
    slug          : string,
    tagList?      : PopularTagType[],
    title         : string,
    updatedAt     : string,
    author        : Profile,
}