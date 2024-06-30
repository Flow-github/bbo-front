import { Component, Input } from '@angular/core';
import { ChatRoom } from '../../../../interfaces/chatRoom';
import { RoomCardComponent } from '../room-card/room-card.component';

@Component({
  selector: 'app-list-room',
  standalone: true,
  imports: [RoomCardComponent],
  templateUrl: './list-room.component.html',
  styleUrl: './list-room.component.scss'
})
export class ListRoomComponent {

  @Input() listRoom: ChatRoom[];

  constructor(){}

}
