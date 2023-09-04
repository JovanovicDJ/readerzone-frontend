import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchFriendsComponent } from './components/search-friends/search-friends.component';



@NgModule({
  declarations: [
    HomepageComponent,
    SearchFriendsComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomepageModule { }
