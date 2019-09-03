import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
artistas: any[] = [];
  constructor(private http: HttpClient) { }

  getArtists(): Observable<any> {
    return this.http.get('http://localhost:3010/artist')
    .pipe( map((resp: any[]) => {
      this.artistas = resp;
      return resp;
    }));
    // .subscribe(resp => {
    //   return resp;
    // });
    // return this.artistas;
  }

  getArtistsById( id: string ) {
     return this.artistas.find(artista => artista._id === id);
  }
}
