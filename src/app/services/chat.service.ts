import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Message } from '../interfaces/message';
import { Observable, Subject } from 'rxjs';
import { ChatRoom } from '../interfaces/chatRoom';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ChatService {

  private readonly baseUrl:string = 'http://localhost:3000/';

  private socketConnexion: Socket;
  private subListRoom$: Subject<ChatRoom[]>;
  private subChatContent$: Subject<Message[]>;
  private subNewMessage$: Subject<Message>;
  private headers: HttpHeaders;

  public get listRoom$(): Observable<ChatRoom[]>{
    return this.subListRoom$.asObservable();
  }

  public get chatContent$(): Observable<Message[]>{
    return this.subChatContent$.asObservable();
  }

  public get newMessage$(): Observable<Message>{
    return this.subNewMessage$.asObservable();
  }

  constructor(private http:HttpClient) {
    this.subListRoom$ = new Subject<ChatRoom[]>();
    this.subChatContent$ = new Subject<Message[]>();
    this.subNewMessage$ = new Subject<Message>();

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
  }

  public getListRoom(): void{
    const request$: Observable<any> = this.http.get(this.baseUrl + 'chat/list', {headers: this.headers, observe: 'response', withCredentials: true});
    request$.subscribe((data: any) => {this.onListRoom(data)});
  }

  public getContentChat(idChat: number): void{
    const request$: Observable<any> = this.http.get(this.baseUrl + 'chat/' + idChat, {headers: this.headers, observe: 'response', withCredentials: true});
    request$.subscribe((data: any) => {this.onContentChat(data)});
  }

  public initSocketConnection(): void {
    this.disconnect();
    this.socketConnexion = io('http://localhost:3000', {auth: {token: 'chat-bbo'}});
    this.socketConnexion.on('broadcast-message', (data: Message) => {this.broadcastMessage(data)});
  }
  
  public disconnect(): void {
    if (this.socketConnexion) {
      this.socketConnexion.disconnect();
    }
  }

  public sendMessage(message: Message): void {
    this.socketConnexion.emit('send-message', message);
  }

  private onListRoom(data: any): void{
    const listRoom: ChatRoom[] = data.body;
    this.subListRoom$.next(listRoom);
  }

  private onContentChat(data: any): void{
    const listMessage: Message[] = data.body;
    this.subChatContent$.next(listMessage);
  }

  private broadcastMessage(message: Message): void{
    this.subNewMessage$.next(message);
  }
}