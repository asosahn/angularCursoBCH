import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map, mapTo, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';


const SERVER_URL = 'http://localhost:3010/auth';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }


  upload(data: any, params: any) {
    // const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    return this.httpClient.post<any>(`${SERVER_URL}/upload`, data, {
      reportProgress: true,
      observe: 'events',
      // headers
    })
    .pipe(
      map((event: any) => {
        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  files(): Observable<any> {
    return this.httpClient.get<any>(`${SERVER_URL}/files`);
  }

  download( filename: any ) {

    return this.httpClient.post<Blob>(`${SERVER_URL}/download` , { filename: filename.originalname }, {
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      //    Accept: 'application/json'
      // }),
      responseType: 'blob' as 'json'
    })
    .pipe(
      map((file: Blob) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.originalname;
        a.click();
      }),
      mapTo(true),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
