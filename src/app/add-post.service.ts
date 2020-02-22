import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostPayload } from './add-post/post-payload';
import { Observable, Subject } from 'rxjs';
import { MessagePayload } from './message/message-payload';
import { UserPayload } from './display-recipients/user-payload';
import { tap } from 'rxjs/operators';
import { MessageToSendPayload } from './message/message-to-send-payload';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AddPostService {

  constructor(private httpClient: HttpClient) {

   }

   private _refreshNeeded$ = new Subject<void>();
   
   get refreshNeeded$(){
    return this._refreshNeeded$;  
   }

   addPost(postPayload: PostPayload){
     //return this.httpClient.post('http://localhost:8080/api/posts/new-post', postPayload);  
     return this.httpClient.post('https://chat-official-maryn.herokuapp.com/api/posts/new-post', postPayload); 

  
   }

  //  addMessage(messagePayload: MessagePayload): Observable<MessagePayload>{
  //   return this.httpClient.post<MessagePayload>('http://localhost:8080/api/posts/message', messagePayload)
  //              .pipe(
  //                tap(() => { 
  //                   this._refreshNeeded$.next();
  //                })
  //              );  
  // }

  addMessage(messagePayload: MessageToSendPayload): Observable<MessageToSendPayload>{

    //return this.httpClient.post<MessageToSendPayload>('http://localhost:8080/api/posts/message', messagePayload)
    return this.httpClient.post<MessageToSendPayload>('https://chat-official-maryn.herokuapp.com/api/posts/message', messagePayload)


               .pipe(
                 tap(() => { 
                    this._refreshNeeded$.next();
                 })
               );  
  }

   getAllPosts(): Observable<Array<PostPayload>>{
     //return this.httpClient.get<Array<PostPayload>>('http://localhost:8080/api/posts/all');
     return this.httpClient.get<Array<PostPayload>>('https://chat-official-maryn.herokuapp.com/api/posts/all');
   }

   getAllMessages(permaLink: Number): Observable<MessagePayload[]>{
    //return this.httpClient.get<MessagePayload[]>('http://localhost:8080/api/posts/display-all-messages/' + permaLink);
    return this.httpClient.get<MessagePayload[]>('https://chat-official-maryn.herokuapp.com/api/posts/display-all-messages/' + permaLink);
  }

   getPost(permaLink: Number):Observable<PostPayload>{
     //return this.httpClient.get<PostPayload> ('http://localhost:8080/api/posts/get/' + permaLink);
     return this.httpClient.get<PostPayload> ('https://chat-official-maryn.herokuapp.com/api/posts/get/' + permaLink);

   }

   getAllUsers(): Observable<Array<UserPayload>>{
    //return this.httpClient.get<Array<UserPayload>>('http://localhost:8080/api/posts/display-recipients');
    return this.httpClient.get<Array<UserPayload>>('https://chat-official-maryn.herokuapp.com/api/posts/display-recipients');

 
  }
}
