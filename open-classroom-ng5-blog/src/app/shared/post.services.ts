import { Subject } from "rxjs/Subject";
import { HttpClient } from "selenium-webdriver/http";
import { resolve } from "url";
import { reject } from "q";
import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Post } from "./post.models";

export const incrementLoveIts = true;
export const decrementLoveIts = false;
export const firebasePostsTable = 'posts';

@Injectable()
export class PostService {

    posts: Post[] = [];
    postSubject = new Subject<Post[]>();
    firebaseStorageRef = firebase.database().ref(firebasePostsTable);

    constructor() {}

    emitPosts() { this.postSubject.next(this.posts.slice()); }
    savePostsToFirebase() { this.firebaseStorageRef.set(this.posts); }
    getPosts() { 
        this.firebaseStorageRef.on('value',
                (data) => {
                    this.posts = data.val() ? data.val() : [];
                    this.emitPosts();
                }
            )
    }
    updatePosts(){
        this.savePostsToFirebase();
        this.emitPosts();
    }
    createPost(post: Post) {
        this.posts.push(post);
        this.updatePosts();
    }
    removePost(index: number) {
        this.posts.splice(index, 1);
        this.updatePosts();
    }
    updateLoveIts(index: number, mode: boolean) {
        if (mode === incrementLoveIts) { this.posts[index].loveIts ++; }
        else if (mode === decrementLoveIts) { this.posts[index].loveIts --; }
    }

}