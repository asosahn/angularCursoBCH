import { Injectable } from '@angular/core';

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
  constructor() { }

  getSongs() {
    return this.songs;
  }

  getSongByName( nombreCancion: string ) {
    // debugger;
    const songFound = this.songs.find(song => song.name === nombreCancion);
    return songFound;
  }
}

