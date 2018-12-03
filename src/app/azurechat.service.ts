import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ChatMessage } from './ChatMessage';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'EndpointKey 8db29e9a-2fb2-43bc-bb5c-f67e880e7e60'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AzurechatService {

  constructor(private http: HttpClient) { }

  chatURL = "https://ranjithchatbotqna.azurewebsites.net/qnamaker/knowledgebases/278e8189-a72b-4cca-b506-c1b758bdf96d/generateAnswer";
  sendMessage(message: ChatMessage): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(this.chatURL, message, httpOptions);
  }
}
