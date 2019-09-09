import { AlertasService } from './../../services/alertas.service';

import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  canciones: any[];
  constructor(private router: Router,
              private songsService: SongsService,
              private alertService: AlertasService) {

  }

  verMas(eventName: string) {
    this.router.navigate(['song', eventName]);
    // console.log(eventName);
  }

  ngOnInit() {
    // this.canciones = this.songsService.getSongs();
    this.alertService.showLoading();
    this.songsService.getSongs().subscribe
      ((songs: any) => {
        this.canciones = songs;
        this.alertService.hideLoading();
      }, err => this.alertService.hideLoading());
    // console.log(this.canciones);
  }

}
