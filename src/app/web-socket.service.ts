import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: io.Socket | undefined;

  constructor(private http: HttpClient) {
    this.socket = io.connect('http://localhost:3100');
  }

  // to listen from server for event type of chat or typing
  listenFromServer(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket?.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  // Send data to socket server
  emitToServer(eventName: string, data: any) {
    this.socket?.emit(eventName, data);
  }
}
