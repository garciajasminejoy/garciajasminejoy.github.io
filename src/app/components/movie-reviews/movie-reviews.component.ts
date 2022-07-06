import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { ORDER_TYPE } from 'src/app/enums/sort-type.enum';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'nyx-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.scss']
})
export class MovieReviewsComponent implements OnInit {
  articles: any[] = [];
  filterForm!: FormGroup;
  orderTypes = [
    {
      displayText: 'By Opening Date',
      value: ORDER_TYPE.openingDate
    },
    {
      displayText: 'By Publication Date',
      value: ORDER_TYPE.publicationDate
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.searchReviews('', true, ORDER_TYPE.openingDate, 5);

    this.filterForm = this.formBuilder.group({
      searchKey: [''],
      orderType: [ORDER_TYPE.openingDate]
    });
  }

  searchMovieReviews(): void {
    const { searchKey, orderType } = this.filterForm.value;
    if (!searchKey) {
      this.searchReviews('', true, ORDER_TYPE.openingDate, 5);
      return;
    }
    this.searchReviews(searchKey, false, orderType);
  }

  searchReviews(
    searchQuery: string,
    isCriticsPick: boolean,
    order: ORDER_TYPE,
    max: number = 0
  ): void {
    this.articlesService.searchMovieReviews(searchQuery, isCriticsPick, order)
      .pipe(take(1))
      .subscribe(({results}) => {
        this.articles = max > 0 ? results.slice(0, max) : results;
      });
  }

  visitArticle(article: any): void {
    window.open(article.link.url, '__blank');
  }

}
