import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageComponent } from './services/message-service/message.service';
import { ImageProbaComponent } from './components/image-proba/image-proba.component';
import { BookCarouselComponent } from './components/book-carousel/book-carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { AutomaticPostComponent } from './components/automatic-post/automatic-post.component';
import { ReviewPostComponent } from './components/review-post/review-post.component';
import { ReviewDataDialogComponent } from './components/review-data-dialog/review-data-dialog.component';
import { RatingModule } from 'primeng/rating';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CategoriesListComponent,
    MessageComponent,
    ImageProbaComponent,
    BookCarouselComponent,
    PostsComponent,
    PostComponent,
    AutomaticPostComponent,
    ReviewPostComponent,
    ReviewDataDialogComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CarouselModule,
    ButtonModule,
    RatingModule
  ],
  exports: [
    MaterialModule,
    NavbarComponent,
    CategoriesListComponent,
    BookCarouselComponent,
    PostsComponent
  ]
})
export class SharedModule { }
