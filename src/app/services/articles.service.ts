import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CATEGORY } from '../enums/categories.enum';
import { ORDER_TYPE } from '../enums/sort-type.enum';

interface StoriesResponse {
  copyright: string;
  last_updated: Date;
  num_results: number;
  results: any[];
  section: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient: HttpClient) { }

  getTopStoriesByCategory(category: CATEGORY): Observable<StoriesResponse> {
    return this.httpClient.get<StoriesResponse>(`${environment.api.nyxBaseUri}/topstories/v2/${category}.json`, {
      params: {
        'api-key': environment.api.nyxKey
      }
    });
  }

  searchMovieReviews(query: string, isCriticsPick: boolean, order: ORDER_TYPE): Observable<any> {
    return this.httpClient.get<StoriesResponse>(`${environment.api.nyxBaseUri}/movies/v2/reviews/search.json`, {
      params: {
        'api-key': environment.api.nyxKey,
        'critics-pick': isCriticsPick ? 'Y': '',
        reviewer: query,
        'order': order || ''
      }
    });
  }
}
