import { SocketService } from './../../services/socket/socket.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private socket: SocketService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut().subscribe();
  }

  enviarMensage(form: NgForm) {
    if (form.valid) {
      const message: any = {
        message: form.value.message,
        user: this.authService.getUser().fullName
      };
      this.socket.sendMessage('global', message);
    }
    // console.log(this.authService.getUser());
    // console.log(form.value);
  }
}
