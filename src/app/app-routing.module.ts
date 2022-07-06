import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookReviewsComponent } from './components/book-reviews/book-reviews.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { MovieReviewsComponent } from './components/movie-reviews/movie-reviews.component';
import { TopStoriesComponent } from './components/top-stories/top-stories.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'top-stories',
        component: TopStoriesComponent
      },
      {
        path: 'book-reviews',
        component: BookReviewsComponent
      },
      {
        path: 'movie-reviews',
        component: MovieReviewsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
