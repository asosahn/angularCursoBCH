import { SocketioService } from './../../services/socket/socketio.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private socketio: SocketioService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut().subscribe();
  }

  SendMessage(form: NgForm) {
    console.log(form.value);
    if (form.valid) {
      const user  = this.authService.getUser();
      console.log(user);
      const message = {
        message: form.value.message,
        user: `${user.firstName} ${user.lastName}`
      };
      this.socketio.sendMessage(message, 'global');
    }
  }
}
