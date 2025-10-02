import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../shared/post.models';
import { PostService } from '../shared/post.services';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  public posts: Post[];
  private postSubscription: Subscription;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => { this.posts = posts; }
    );
    this.postService.getPosts();
    // Doublon ?
    this.postService.emitPosts();
  }

  onRemovePost(index: number) { this.postService.removePost(index); }

  ngOnDestroy() { this.postSubscription.unsubscribe(); }
}