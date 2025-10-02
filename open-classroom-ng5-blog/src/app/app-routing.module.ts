import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { postsListUrl, postsNewUrl } from './shared/post.url';
import { PostNewComponent } from './post-new/post-new.component';
import { PostListComponent } from './post-list/post-list.component';

export const appRoutes: Routes = [ 
    // Home
    { path: '', redirectTo: postsListUrl, pathMatch: 'full' },
    // Post - List
    { path: postsListUrl, component: PostListComponent },
    // Post - New
    { path: postsNewUrl, component: PostNewComponent },
    // Page Not Found to 'Post - List'
    { path: '**', redirectTo: postsListUrl, pathMatch: 'full' }
 ]

 @NgModule({
     imports: [ RouterModule.forRoot(appRoutes) ], 
     exports: [ RouterModule ]
 })
 export class AppRouteModule  { }