import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const URL_SONGS = 'http://192.241.255.40:3010/songs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private songs: any[] = [
    {
      name: 'La chispa adecuada',
      time: '3:40',
      singer: 'Heroes del Silencio'
    },
    {
      name: 'Musica Ligera',
      time: '4:40',
      singer: 'Soda Stereo'
    },
    {
      name: 'Tus Besos',
      time: '5:00',
      singer: 'Juan Luis Guerra'
    },
    {
      name: 'Cuando seas grande',
      time: '5:10',
      singer: 'Miguel Mateos'
    },
  ];
  constructor(private http: HttpClient) { }

  getSongs(): Observable<any> {
    // return this.songs;
    return this.http.get(URL_SONGS).pipe(
      map((songs: any) => {
        this.songs = songs;
        return this.songs;
      })
    );
  }

  async getSongByName( nombreCancion: string ) {
    // debugger;
    // const songFound = this.songs.find(song => song.name === nombreCancion);
    const cancion: any = await this.http.get(URL_SONGS, { params: { name: nombreCancion }}).toPromise();
    if (cancion.length > 0) {
      return cancion[0];
    }
    return {};
    // return songFound;
  }
}

