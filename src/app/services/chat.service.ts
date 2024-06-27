import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class ChatService {

  private socketConnexion: Socket;

  constructor() {   }

  setupSocketConnection() {
    this.socketConnexion = io('http://localhost:3000', {
      auth: {
        token: "abc"
      }
    });

    this.socketConnexion.emit('my-message', 'Hello there from Angular.');

    this.socketConnexion.on('my-broadcast', (data: string) => {
      console.log(data);
    });
  }
  
  disconnect() {
    if (this.socketConnexion) {
      this.socketConnexion.disconnect();
    }
  }
}