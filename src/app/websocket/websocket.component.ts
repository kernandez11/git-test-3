import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import $ from 'jquery';
import { LocalStorageService } from 'ngx-webstorage';
import { WebSocketAPI } from './WebSocketAPI';




@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})

export class WebsocketComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

 
  webSocketAPI: WebSocketAPI;
  //greeting: string;
  name: string;
  //localStorageService: LocalStorageService;
  username: string;
  clicked = true;
  websocketMsgError;
  hide = false;


  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new WebsocketComponent(this.localStorageService),
    this.localStorageService);
    this.username = this.localStorageService.retrieve('username');
  }

  connect(event: any){
    //event.target.disabled = true;
    //$(".disbl").disabled = false;
    //$(".disconnect").prop("disabled", false);
    $(".send").prop("disabled", false);
    this.hide = true;
    this.webSocketAPI._connect();
  }

  disconnect(event: any){
    event.target.disabled = true;
    //$(".connect").prop("disabled", false);
    //$(".send").prop("disabled", true);
    this.hide = false;
    this.webSocketAPI._disconnect();
  }

  sendMessage(){  
    this.webSocketAPI._send(this.name, this.username);
  }


  handleMessage(message, person, id){ 
    console.log("handle message " + message + " " + person + " " + id);
    $(".chat").append("<tr class=''><td>" +
    "<a type='button' href='/display/" + id + "' class='read-more btn btn-primary'>" +
     person + "</a></td><td>" + message + "</td></tr>");

  }


  handleMessage2(person, message){
    //$(".chat2").append("<div class='message'>This is message "+message+"</div>");
    $(".display").html('Messages <i class="far fa-envelope"></i>');
    //$('a[value="' + person + '"]').html('');
    //$('.blog-title :input[value="bb"]').remove();
    //$('.blog-title :input[value="bb"]').html('');
    //$('.blog-title :input[value="bb"]').html('');

    $(".chat2").append("<tr class='clean'><td>" + person + "</td><td></td><td>" + message + "</td></tr>");
  }

}

                