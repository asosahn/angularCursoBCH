import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import * as io from 'socket.io-client';
const URL_ROOT = environment.url_root;
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  private listenGlobalMessage;
  constructor(private toast: ToastrService) { }
  private globalMessages() {
    this.listenGlobalMessage = this.onMessage('global').subscribe(
      ((message: any) => {
        // {message: "mensaje", user: "Ramon Sosa"}
        this.toast.success(message.message, message.user);
      })
    );
  }
  onMessage(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel, (data: any) => observer.next(data));
    });
  }
  sendMessage(channel: any, msg: any) {
    this.socket.emit(channel, msg);
  }
  connect() {
    this.socket = io('http://bch.hazsk.com');
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('conectado al socket');
    });
    this.globalMessages();
  }

  disconnect() {
    this.socket.disconnect(true);
  }
}
