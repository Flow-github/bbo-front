import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatRoom } from '../../../../interfaces/chatRoom';
import { CommonModule } from '@angular/common';
import { ChatEventsService } from '../../services/chat-events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss'
})
export class RoomCardComponent implements OnInit, OnDestroy {

  @Input() chatRoom: ChatRoom;

  private subList: Subscription;

  public selectedClass: string;

  constructor(private chatEventsService: ChatEventsService){}

  public ngOnInit(): void {
    this.subList = this.chatEventsService.eventSelectRoom.subscribe((idRoom: number) => {this.onSelectedRoom(idRoom)});
  }

  public ngOnDestroy(): void {
    this.subList.unsubscribe();
  }

  public onClick():void{
    this.chatEventsService.eventSelectRoom.emit(this.chatRoom.id);
  }

  private onSelectedRoom(idRoom: number): void{
    this.selectedClass = idRoom === this.chatRoom.id ? 'room-card-selected' : '';
  }

}
