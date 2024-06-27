import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  providers: [ChatService],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService){}

  public ngOnInit(): void {
    this.chatService.setupSocketConnection();
  }

}
