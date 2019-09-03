import { SongsService } from './../../services/songs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { SongsSchema } from '../../services/songs.service';
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  cancion: {};
  constructor(private activatedRoute: ActivatedRoute,
              private songsService: SongsService,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      // get song by id from songs service
      // debugger;
      this.cancion = this.songsService.getSongByName
      (params.name);
      console.log(this.cancion);
    });
   }
   irAtras() {
    this.router.navigate(['songs']);
   }
  ngOnInit() {
  }

}
