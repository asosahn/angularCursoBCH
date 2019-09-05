// importaciones de modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import para usar http request
import { HttpClientModule } from '@angular/common/http';
// import para poder usar ngModel y Formularios
import { FormsModule } from '@angular/forms';

// importaciones de componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SongsComponent } from './components/songs/songs.component';
import { ArtistasComponent } from './components/artistas/artistas.component';
import { SongComponent } from './components/song/song.component';
import { ArtistComponent } from './components/artist/artist.component';
import { CardComponent } from './components/card/card.component';
import { CardSongComponent } from './components/card-song/card-song.component';
import { FormaComponent } from './components/forma/forma.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { AgregarArtistaComponent } from './components/agregar-artista/agregar-artista.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SongsComponent,
    ArtistasComponent,
    SongComponent,
    ArtistComponent,
    CardComponent,
    CardSongComponent,
    FormaComponent,
    ErrorsComponent,
    AgregarArtistaComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
