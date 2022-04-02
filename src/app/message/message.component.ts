import {Component, Input, OnInit} from '@angular/core';
import { Message } from '../chat/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() public message: Message;
  @Input() public localUser: string;
  public date:Date
  constructor() { }

  ngOnInit(): void {
    this.date = new Date(this.message.time)
    console.log(this.date)
  }

}
