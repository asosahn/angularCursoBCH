import { environment } from './../../../environments/environment';

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  private listenGlobalMessage;
  constructor(private toastr: ToastrService) {
  }

  private globalMessages() {
    this.listenGlobalMessage = this.onMessage('global').subscribe(
      ((message: any) => {
        this.toastr.success(message.message, message.user);
      })
    );
  }

  sendMessage(msg: any, channel: string) {
     this.socket.emit(channel, msg);
   }
  onMessage(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel, (data: any) => observer.next(data));
    });
  }
  connect() {
    this.socket = io(environment.url_root);
    this.socket.connect();
    this.globalMessages();
    this.socket.on('connect', () => {
      console.log('Conectado a Socket');
    });
  }

  disconnect() {
    this.socket.disconnect(true);
  }
}
