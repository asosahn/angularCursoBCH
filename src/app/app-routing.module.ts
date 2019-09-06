import { AuthGuard } from './guard/auth.guard';
import { PrincipalComponent } from './components/principal/principal.component';

import { AgregarArtistaComponent } from './components/agregar-artista/agregar-artista.component';
import { FormaComponent } from './components/forma/forma.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SongComponent } from './components/song/song.component';
import { ArtistasComponent } from './components/artistas/artistas.component';

import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SongsComponent } from './components/songs/songs.component';
import { FormdataComponent } from './components/formdata/formdata.component';
import { LoginComponent } from './components/auth/login/login.component';


const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'songs', component: SongsComponent },
      { path: 'artistas', component: ArtistasComponent },
      { path: 'song/:name', component: SongComponent },
      { path: 'artist/:id', component: ArtistComponent },
      { path: 'forma', component: FormaComponent },
      { path: 'agregarArtista', component: AgregarArtistaComponent },
      { path: 'formdata', component: FormdataComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  // si no encuentra la ruta, hace redireccionamiento con redirectTo
  { pathMatch: 'full', path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
