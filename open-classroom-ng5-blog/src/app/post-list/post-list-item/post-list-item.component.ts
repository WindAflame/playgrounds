import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../shared/post.models';
import { PostService, incrementLoveIts, decrementLoveIts } from '../../shared/post.services';

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() 
  public post: Post;

  @Input() 
  public indexPost: number;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
  }
  
  onIncLikeIts(){ this.postService.updateLoveIts(this.indexPost, incrementLoveIts); }
  onDecLikeIts(){ this.postService.updateLoveIts(this.indexPost, decrementLoveIts); }
  onDelete(){ this.postService.removePost(this.indexPost); }

}