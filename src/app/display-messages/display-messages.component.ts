import { Component, OnInit } from '@angular/core';
import { MessagePayload } from '../message/message-payload';
import { ActivatedRoute } from '@angular/router';
import { AddPostService } from '../add-post.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-messages',
  templateUrl: './display-messages.component.html',
  styleUrls: ['./display-messages.component.css']
})
export class DisplayMessagesComponent implements OnInit {
  //messages: Observable<Array<MessagePayload>>;
  messages: MessagePayload[];
  public permaLink: Number;
  //public someLink = 1;

  constructor(private router: ActivatedRoute, private addPostService: AddPostService) {

   }

  ngOnInit() {
      this.router.params.subscribe(params => {
       this.permaLink = params['id'];
      });

      this.addPostService.refreshNeeded$
           .subscribe( params => {
               //this.permaLink = this.router.params['id'];
               //console.log("this is permaLink " + this.permaLink);
               this.getAllMessages(this.permaLink);
           });
           
      this.getAllMessages(this.permaLink);
         
    }
  //     this.router.params.subscribe(params => {
  //     this.permaLink = params['id'];
  //     this.messages = this.addPostService.getAllMessages(this.permaLink);  
  //  });

  
  private getAllMessages(number: Number){
  this.addPostService.getAllMessages(number).subscribe(
   (messages: MessagePayload[]) => this.messages = messages
  );
}



    // this.addPostService.getAllMessages(this.permaLink).subscribe( (data:Observable<Array<MessagePayload>>) => {
    //    this.messages = data;
    // }, (err: any) => {
    //   console.log("Failure Response");
    // }); 

  

}
