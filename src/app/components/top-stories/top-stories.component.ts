import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { CATEGORY } from 'src/app/enums/categories.enum';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'nyx-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss']
})
export class TopStoriesComponent implements OnInit {
  categories = CATEGORY;
  articles: any[] = [];

  categoryFilterForm!: FormGroup;

  constructor(
    private articlesService: ArticlesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchArticles(CATEGORY.home, 5);

    this.categoryFilterForm = this.formBuilder.group({
      category: [CATEGORY.home]
    });

    this.categoryFilterForm.valueChanges
      .subscribe(value => {
        this.searchArticles(value.category);
      });
  }

  searchArticles(category: CATEGORY, maxResults = 0): void {
    this.articlesService.getTopStoriesByCategory(category)
      .pipe(take(1))
      .subscribe(({results}) => {
        this.articles = maxResults > 0 ? results.slice(0, maxResults) : results;
      });
  }

  visitArticle(article: any): void {
    window.open(article.url, '__blank');
  }

}
