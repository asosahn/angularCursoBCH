import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';

const URL_ARTISTS = 'http://172.23.1.114:3010/artist';
@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  artistas: any[] = [];
  constructor(private http: HttpClient) { }

  // getArtists(): Observable<any> {
  //   return this.http.get('http://172.23.1.114:3010/artist')
  //     .pipe(map((resp: any[]) => {
  //       this.artistas = resp;
  //       return resp;
  //     }));
  //   // .subscribe(resp => {
  //   //   return resp;
  //   // });
  //   // return this.artistas;
  // }

  // async getArtists(): Promise<any> {
  //   this.artistas = await this.http.get('http://172.23.1.114:3010/artist').toPromise() as any[];
  //   return this.artistas;
  // }

  getArtists(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(URL_ARTISTS).toPromise()
        .then((resp: any[]) => {
          this.artistas = resp;
          resolve(this.artistas);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }



  // getArtistsById(id: string) {
  //   return this.artistas.find(artista => artista._id === id);
  // }

  // forma observable
  // getArtistsById(id: string): Observable<any> {
  //   return this.http.get(`${URL_ARTISTS}?_id=${id}`).pipe(
  //     map((resp: any[]) => {
  //       if (resp.length > 0) {
  //         return resp[0];
  //       }
  //       return {};
  //     })
  //   );
  // }

  // async await (Promise)
  // async getArtistsById(id: string): Promise<any> {
  //   try {
  //     // const artista: any = await this.http.get(`${URL_ARTISTS}?_id=${id}`).toPromise();
  //     const artista: any = await this.http.get(URL_ARTISTS, { params: { _id: id } }).toPromise();
  //     if (artista.length > 0) {
  //       return artista[0];
  //     }
  //     return {};
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // con formato de promesa
  getArtistsById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(URL_ARTISTS, { params: { _id: id } }).toPromise()
        .then((artista: any) => {
          if (artista.length > 0) {
            resolve(artista[0]);
          } else {
            resolve({});
          }
        })
        .catch(err => reject(err));
    });
  }
}
