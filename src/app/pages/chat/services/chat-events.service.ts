import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class ChatEventsService{

    public eventSelectRoom: EventEmitter<number>;
    public eventSendMessage: EventEmitter<string>;

    constructor(){
        this.eventSelectRoom = new EventEmitter<number>();
        this.eventSendMessage = new EventEmitter<string>();
    }

}