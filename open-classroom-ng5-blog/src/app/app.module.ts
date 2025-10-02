import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRouteModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PostNewComponent } from './post-new/post-new.component';

import { PostService } from './shared/post.services';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list/post-list-item/post-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostNewComponent,
    PostListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PostService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
