import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  message: string = '';
  userName: string = '';
  typingData: string = '';
  chatList: any[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.listenFromServer('typing').subscribe({
      next: (data) => {
        this.typingData = data.userName || '';
      },
      error: (error) => console.error('error', error),
    });

    this.webSocketService.listenFromServer('chat').subscribe({
      next: (data) => {
        this.typingData = '';
        this.chatList.push(data);
      },
      error: (error) => console.error('error', error),
    });
  }

  typingStop() {
    this.typingData = '';
  }

  messageTyping() {
    this.webSocketService.emitToServer('typing', { userName: this.userName });
  }

  sendMessage() {
    this.webSocketService.emitToServer('chat', {
      userName: this.userName,
      message: this.message,
    });
    this.message = '';
  }
}
