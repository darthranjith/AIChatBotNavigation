import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AzurechatService } from "../azurechat.service";
import { ChatMessage } from '../ChatMessage';
import { Router } from "@angular/router";
import { Chat } from './Chat';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor(private service: AzurechatService, private router: Router) { }
  messageForm = new FormGroup({
    message: new FormControl('')
  });

  listMessage: Chat[] = [];

  onSubmit = () => {
    var cm = new ChatMessage(this.messageForm.value['message']);
    let chat = new Chat();
    chat.user = "User";
    chat.message = this.messageForm.value['message'];
    this.listMessage.push(chat);
    this.messageForm.reset();
    this.service.sendMessage(cm).subscribe(x => {
      let answer = x['answers'][0]['answer'];
      let chat = new Chat();
      chat.user = "Bot";
      console.log(answer);

      if (typeof answer.match(/APPNAV/g) != 'undefined' && answer.match(/APPNAV/g)) {
        let nav = answer.split('-')[1]
        this.router.navigateByUrl("/" + nav.toLowerCase());
        answer = "Done"
      }
      chat.message = answer;
      this.listMessage.push(chat);
    })
  }
  ngOnInit() {
  }

}
