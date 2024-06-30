import { Component, Input } from '@angular/core';
import { Message } from '../../../../interfaces/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss'
})
export class MessageCardComponent {

  @Input() message: Message;

}
