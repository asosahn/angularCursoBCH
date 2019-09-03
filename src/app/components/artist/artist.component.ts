import { ArtistsService } from '../../services/artists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artista: {} = {};
  constructor(private router: Router,
              private activedRoute: ActivatedRoute,
              private artistsService: ArtistsService) {
    this.activedRoute.params.subscribe(
      (params: any) => {
        console.log(params);
        this.artista = this.artistsService.getArtistsById(params.id);
      }
    );
  }
  irAtras() {
    this.router.navigate(['/artistas']);
  }
  ngOnInit() {
  }

}
