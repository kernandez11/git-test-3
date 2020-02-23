import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessagePayload } from './message-payload';
import { AddPostService } from '../add-post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayMessagesComponent } from '../display-messages/display-messages.component';
import { MessageToSendPayload } from './message-to-send-payload';
import { WebsocketComponent } from '../websocket/websocket.component';
import { LocalStorageService } from 'ngx-webstorage';
import $ from 'jquery';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})


export class MessageComponent implements OnInit { 
  //messages: MessagePayload[];
   
  permaLink: Number;

  addMessageForm: FormGroup;
  messagePayload: MessagePayload;
  messageToSendPayload: MessageToSendPayload;
  message = new FormControl('');
  to = new FormControl('');
  username: string;
  
  //, private router: Router
  constructor(private router: ActivatedRoute, private addPostService: AddPostService,
    displayMessageComponent: DisplayMessagesComponent, 
    private localStorageService: LocalStorageService
    ) {
    
     // this.idLink = displayMessageComponent.permaLink; 
      
    this.addMessageForm = new FormGroup({
      message: this.message,
      to: this.to  
  });
  // this.messagePayload = {
  //   person: '',
  //   message: '',
  //   to: ''
  // }

  this.messageToSendPayload = {
    person: '',
    message: '',
    to: 0
  }
  

   }

  ngOnInit(): void {

    

    this.username = this.localStorageService.retrieve('username');

    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
     });
  }

  addMessage(){
    this.messageToSendPayload.message = this.addMessageForm.get('message').value;
    this.messageToSendPayload.to = this.permaLink;
    this.messageToSendPayload.person = this.username;
    $('.clean').html('');

    //this.messagePayload.message = this.addMessageForm.get('message').value;
    //this.messagePayload.to = this.addMessageForm.get('to').value;
     
    //this.addPostService.addMessage(this.messagePayload).subscribe(data => {
      this.addPostService.addMessage(this.messageToSendPayload).subscribe(data => {
       //this.router.navigateByUrl('/display');
       //this.messages.push(this.messagePayload);
       

       console.log('message sent..permalink: ' + this.permaLink);
    }, error => {
       console.log('Failure Response'); 
    })

  }

}
