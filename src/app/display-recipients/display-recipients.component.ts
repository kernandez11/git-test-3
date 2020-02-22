import { Component, OnInit } from '@angular/core';
import { AddPostService } from '../add-post.service';
import { Observable } from 'rxjs';
import { UserPayload } from './user-payload';

@Component({
  selector: 'app-display-recipients',
  templateUrl: './display-recipients.component.html',
  styleUrls: ['./display-recipients.component.css']
})
export class DisplayRecipientsComponent implements OnInit {

  users: Observable<Array<UserPayload>>;
  constructor(private postService: AddPostService) { }


  ngOnInit(){
    this.users = this.postService.getAllUsers();

  }

}
