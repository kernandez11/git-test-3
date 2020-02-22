import { Component, OnInit } from '@angular/core';
import { AddPostService } from '../add-post.service';
import { PostPayload } from '../add-post/post-payload';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  user: string;

  posts: Observable<Array<PostPayload>>;
  constructor(private postService: AddPostService, 
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.user = this.localStorageService.retrieve('username');

    this.posts = this.postService.getAllPosts();
  }

}
