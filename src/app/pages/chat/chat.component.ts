import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ChatRoom } from '../../interfaces/chatRoom';
import { Message } from '../../interfaces/message';
import { ListRoomComponent } from './components/list-room/list-room.component';
import { ChatContentComponent } from './components/chat-content/chat-content.component';
import { ChatEventsService } from './services/chat-events.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ListRoomComponent, ChatContentComponent],
  providers: [ChatService, ChatEventsService],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {

  private currentIdRoom: number;
  private subList: Subscription;

  public listRoom: ChatRoom[];
  public listMessage: Message[];

  constructor(private chatService: ChatService, private chatEventsService: ChatEventsService){}

  public ngOnInit(): void {
    this.subList = this.chatService.listRoom$.subscribe((value: ChatRoom[]) => {this.onListRoom(value)});
    this.subList.add(this.chatService.chatContent$.subscribe((value: Message[]) => {this.onListMessage(value)}));
    this.subList.add(this.chatService.newMessage$.subscribe((value: Message) => {this.onNewMessage(value)}));
    this.subList.add(this.chatEventsService.eventSelectRoom.subscribe((idRoom: number) => {this.onSelectRoom(idRoom)}));
    this.subList.add(this.chatEventsService.eventSendMessage.subscribe((text: string) => {this.onSendMessage(text)}));

    this.chatService.getListRoom();
  }

  public ngOnDestroy(): void {
    this.chatService.disconnect();
    this.subList.unsubscribe();
  }

  private onListRoom(listRoom: ChatRoom[]): void{
    this.listRoom = listRoom;
  }

  private onListMessage(listMessage: Message[]): void{
    this.listMessage = listMessage;
  }

  private onNewMessage(message: Message): void{
    if(message.idChatRoom === this.currentIdRoom){
      this.listMessage.push(message);
    }
  }

  private onSelectRoom(idRoom: number): void{
    this.currentIdRoom = idRoom;
    this.chatService.getContentChat(this.currentIdRoom);
    this.chatService.initSocketConnection();
  }

  private onSendMessage(text: string): void{
    const message: Message = {idChatRoom: this.currentIdRoom, sender: {id: 4, name: "Me", avatar: "me.jpg", token: 'chat-bbo'}, text: text, timestamp: 0};
    this.chatService.sendMessage(message);
  }

}
