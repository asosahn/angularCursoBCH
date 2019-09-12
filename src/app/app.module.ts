// importaciones de modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import para usar http request
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import para poder usar ngModel y Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// importando loading
import { NgxSpinnerModule } from 'ngx-spinner';
// importando toast alerts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// importar grid
import { AgGridModule } from 'ag-grid-angular';



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

import { FormdataComponent } from './components/formdata/formdata.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { InterceptorService } from './guard/interceptor.service';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { FilesizePipe } from './pipes/filesize.pipe';
import { CombinadoArtistaComponent } from './components/combinado-artista/combinado-artista.component';
import { GridComponent } from './components/grid/grid.component';

import 'ag-grid-enterprise';

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
    FileuploadComponent,
    FilesizePipe,
    CombinadoArtistaComponent,
    GridComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AgGridModule.withComponents([]),

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
