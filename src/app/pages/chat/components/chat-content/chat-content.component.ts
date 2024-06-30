import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Message } from '../../../../interfaces/message';
import { MessageCardComponent } from '../message-card/message-card.component';
import { SendMessageComponent } from '../send-message/send-message.component';

@Component({
  selector: 'app-chat-content',
  standalone: true,
  imports: [MessageCardComponent, SendMessageComponent],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss'
})
export class ChatContentComponent implements AfterViewChecked {

  @Input() listMessage: Message[];

  @ViewChild('screenMessage') screenMessage: ElementRef;
  @ViewChild('containerScreenMessage') containerScreenMessage: ElementRef;

  constructor(){}

  public ngAfterViewChecked(): void {
    this.updateScreenPosition();
  }

  private updateScreenPosition(): void{
    const stylesScreen:CSSStyleDeclaration = window.getComputedStyle(this.screenMessage.nativeElement);
    const screenHeight: number = parseInt(stylesScreen.height, 10);
    const stylesContainerScreen:CSSStyleDeclaration = window.getComputedStyle(this.containerScreenMessage.nativeElement);
    const containerScreenHeight: number = parseInt(stylesContainerScreen.height, 10);
    const newPos:number = Math.max(0, screenHeight - containerScreenHeight);
    this.containerScreenMessage.nativeElement.scrollTo({
      top: newPos,
      left: 0,
      behavior: "smooth",
    });
  }

}
