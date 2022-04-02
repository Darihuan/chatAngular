import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import * as SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import {Message} from "./Message";

@Component({
  selector: 'app-root',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public username = '';
  public text: string = '';
  public messages: Message[] = [];
  public client: Client = new Client();
  public color: number = this.randomColor()
  public writer:string= "";

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.connect()
    if (this.route.snapshot.paramMap.get('name') != null) { // @ts-ignore
      this.username = this.route.snapshot.paramMap.get('name').toString();
    }
    this.client.webSocketFactory = function () {
      return new SockJS("https://backchat.herokuapp.com/chat-websocket/");
    };

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + this.client.connected + " : " + frame);
      this.client.subscribe('/chat/messages', (message) => {
        this.messages.push(JSON.parse(message.body));
        console.log(message)
      });
      this.client.subscribe('/chat/writting', (message) => {
        if(message.body != this.username){
          this.writer = message.body+" is writting..."
          setTimeout(() => {
            this.writer = ""
          }, 2000);
        }

      });

      let message: Message = {
        content: "",
        user: this.username,
        time: 0,
        type: "NEW_USER",
        color: this.color
      }
      this.client.publish({destination: '/app/chat', body: JSON.stringify(message)});
    }


    this.client.onDisconnect = (frame) => {
      console.log('Disconnected: ' + frame);
    };
  }


  desconectar() {
    this.client.deactivate()
    this.router.navigate(['/']);

  }

  connect() {
    this.client.activate();
  }

  randomColor() {
    let r = Math.floor(Math.random() * 4) + 1;
    return r;
  }

  sendMessage() {
    if (this.text != '') {
      let message: Message = {
        content: this.text,
        user: this.username,
        time: 0,
        type: "MESSAGE",
        color: this.color
      };
      this.client.publish({destination: '/app/chat', body: JSON.stringify(message)});
      this.text = '';
    }

  }

  writting() {
    this.client.publish({destination: '/app/writting', body: this.username});
  }
}







