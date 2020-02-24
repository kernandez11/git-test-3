import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebsocketComponent } from './websocket.component';
import { LocalStorageService } from 'ngx-webstorage';
import { MessagePayload } from '../message/message-payload';
import $ from 'jquery';


export class WebSocketAPI {
    //webSocketEndPoint: string = 'http://localhost:8080/ws';

    webSocketEndPoint: string = 'https://chat-official-maryn.herokuapp.com/ws';
   
    topic: string = "/topic/greetings";
    stompClient: any;
    userSub: string;
    messagePayload: MessagePayload;
    //localStorageService: LocalStorageService;
    user: string;


    websocketComponent: WebsocketComponent;    
    constructor(websocketComponent: WebsocketComponent,
        private localStorageService: LocalStorageService){

        this.websocketComponent = websocketComponent;
        this.messagePayload = {
            person: '',
            message: '',
            to: ''
          }
    }
    _connect() {
        this.user = this.localStorageService.retrieve('username')
        console.log("Initialize WebSocket Connection " + this.user);
        let ws = new SockJS(this.webSocketEndPoint);
        console.log("This is SockJS " + ws);
        $(".alert").addClass('invisible').removeClass('visible');

        // this.websocketComponent.websocketMsgError = 'error';
        //sthis.websocketComponent.websocketMsgError = 'Error occured, try to connect again';
        
        

        this.userSub = "/queue/" + this.user;
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });

            _this.stompClient.subscribe(_this.userSub, function (sdkEvent) {
                _this.onMessageReceived2(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        $(".alert").addClass('visible').removeClass('invisible');
        $(".alert").html('Error occured, try to connect again');
        //this.websocketMsgError = 'Error occured, try to connect again';
        setTimeout(() => { 
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message, username) {
        //const _this = this;
        this.messagePayload.message = message;
        this.messagePayload.person = username;
        console.log("calling logout api via web socket");
        // /this.stompClient.send("/app/hello", {}, JSON.stringify(message, ));
        this.stompClient.send("/app/hello", {}, JSON.stringify(this.messagePayload));

        // JSON.stringify({ 'person': author,
    	// 'to': thread,
    	// 'message': $("#message").val() })
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);
        console.log("Message Recieved from Server - body.content:: " + JSON.parse(message.body).content);
        //this.appComponent.handleMessage(JSON.stringify(message.body));
        this.websocketComponent.handleMessage(JSON.parse(message.body).message,
        JSON.parse(message.body).person,
        JSON.parse(message.body).id);
        //this.appComponent.handleMessage(message.body.content);
    }

    onMessageReceived2(message) {
        console.log("Message Recieved from Server :: " + message);
        console.log("Message Recieved from Server - body.content:: " + JSON.parse(message.body).content);
        //this.appComponent.handleMessage(JSON.stringify(message.body));
        
        this.websocketComponent.handleMessage2(JSON.parse(message.body).person, 
        JSON.parse(message.body).message);
        //this.appComponent.handleMessage(message.body.content);
    }
}
