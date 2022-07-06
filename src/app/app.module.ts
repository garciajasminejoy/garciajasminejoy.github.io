import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { MovieReviewsComponent } from './components/movie-reviews/movie-reviews.component';
import { BookReviewsComponent } from './components/book-reviews/book-reviews.component';
import { TopStoriesComponent } from './components/top-stories/top-stories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MovieReviewsComponent,
    BookReviewsComponent,
    TopStoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
