import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatEventsService } from '../../services/chat-events.service';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss'
})
export class SendMessageComponent {

  @ViewChild('textElement') textElement: ElementRef;

  constructor(private chatEventsService: ChatEventsService){}

  public sendMessage(): void{
    if(this.textElement.nativeElement.value){
      this.chatEventsService.eventSendMessage.emit(this.textElement.nativeElement.value);
      this.textElement.nativeElement.value = "";
    }
  }

}
