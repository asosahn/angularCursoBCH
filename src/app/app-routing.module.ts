import { ArtistComponent } from './components/artist/artist.component';
import { SongComponent } from './components/song/song.component';
import { ArtistasComponent } from './components/artistas/artistas.component';

import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsComponent } from './components/songs/songs.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'artistas', component: ArtistasComponent },
  // { path: 'artistas/:id', component: ArtistasComponent },
  { path: 'song/:name', component: SongComponent },
  { path: 'artist/:id', component: ArtistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
