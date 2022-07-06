import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'nyx-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.scss']
})
export class BookReviewsComponent implements OnInit {
  articles: any[] = [];
  filterFormGroup!: FormGroup;
  showFilterError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.getLatestReviews();
    this.filterFormGroup = this.formBuilder.group({
      isbn: [null],
      title: [''],
      author: ['']
    });
    this.filterFormGroup.valueChanges.subscribe(() => this.showFilterError = false);
  }

  getLatestReviews(): void {
    this.articlesService.getLatestBookReviews('Expeditions Disasters and Adventures')
      .pipe(take(1))
      .subscribe(({results}) => {
        const books = !!results && !!results.books ? results.books : [];
        const transformedData = this.transformSearchResponseData(books);
        this.articles = transformedData.slice(0, 10);
      });
  }

  search(): void {
    const { isbn, title, author } = this.filterFormGroup.value;
    if (!isbn && !title && !author) {
      this.showFilterError = true;
      this.getLatestReviews();
      return;
    }
    this.searchReviews(isbn, title, author);
  }

  searchReviews(isbn: number, title: string, author: string, max = 0): void {
    this.articlesService.searchBookReviews(isbn, title, author)
      .pipe(take(1))
      .subscribe(({results}) => {
        const books = !!results ? results: [];
        this.articles = this.transformReviewedBooks(books);
      });
  }

  visitArticle(article: any): void {
    if (article.articleUrl) {
      window.open(article.articleUrl, '__blank');
    }
  }

  transformSearchResponseData(books: any): any {
    return books.map((book: any) => ({
      title: book.title,
      description: book.description,
      author: book.author,
      reviewer: null,
      articleUrl: book.sunday_review_link
    }));
  }

  transformReviewedBooks(books: any): any {
    return books.map((book: any) => ({
      title: book.book_title,
      description: book.summary,
      author: book.book_author,
      reviewer: book.byline,
      articleUrl: book.url
    }));
  }

}
