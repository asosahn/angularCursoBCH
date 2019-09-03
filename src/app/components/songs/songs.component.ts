
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
              private songsService: SongsService) {

  }

  verMas( eventName: string ) {
    this.router.navigate(['song', eventName]);
    // console.log(eventName);
  }

  ngOnInit() {
    this.canciones = this.songsService.getSongs();
    console.log(this.canciones);
  }

}
