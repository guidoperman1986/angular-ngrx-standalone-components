import { FeedResponse } from "./get-reed-response.interface";

export interface FeedState {
    isLoading: boolean;
    error: string | null;
    data: FeedResponse | null;
}