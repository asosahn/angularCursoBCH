// importaciones de modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import para usar http request
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import para poder usar ngModel y Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

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
import { FormdataComponent } from './components/formdata/formdata.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { InterceptorService } from './services/auth/interceptor.service';
import { FilesizePipe } from './pipes/filesize.pipe';
import { GridComponent } from './components/grid/grid.component';

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
    AgregarArtistaComponent,
    FormdataComponent,
    LoginComponent,
    SignupComponent,
    PrincipalComponent,
    FilesizePipe,
    GridComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RxReactiveFormsModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
