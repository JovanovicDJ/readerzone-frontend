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

@NgModule({
  declarations: [
    NavbarComponent,
    CategoriesListComponent,
    MessageComponent,
    ImageProbaComponent,
    BookCarouselComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CarouselModule,
    ButtonModule
  ],
  exports: [
    MaterialModule,
    NavbarComponent,
    CategoriesListComponent,
    BookCarouselComponent
  ]
})
export class SharedModule { }
