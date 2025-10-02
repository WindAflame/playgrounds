import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../shared/post.services';
import { Post } from '../shared/post.models';
import { postsListUrl } from '../shared/post.url';

@Component({
  selector: 'post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {

  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: [ '', [Validators.required] ],
      content: [ '', [Validators.required] ]
    })
  }

  onSavePost() {
    const newPost = new Post(
      this.postForm.get('title').value,
      this.postForm.get('content').value,
      0,
      new Date().getTime()
    );
    this.postService.createPost(newPost);
    this.router.navigate( [postsListUrl] );
  }

}
