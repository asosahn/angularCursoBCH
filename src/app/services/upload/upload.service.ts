
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map, mapTo, catchError } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';

const URL_PATH = 'http://bch.hazsk.com/auth';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  files: Array<any> = [];
  // crear un canal para suscripción
  subscriptionListenNewFiles = new Subject<any>();
  constructor(private http: HttpClient) { }

  upload(file: any) {
    // const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this.http.post<any>(`${URL_PATH}/upload`, file, {
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
            this.files.push(event.body.file);
            // para enviar a usuarios conectados al canal
            this.subscriptionListenNewFiles.next(this.files);
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  excel(file: any) {
    // const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this.http.post<any>(`${URL_PATH}/excel`, file, {
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
            this.files.push(event.body.file);
            // para enviar a usuarios conectados al canal
            this.subscriptionListenNewFiles.next(this.files);
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  canSubscribeToNewFiles() {
    return this.subscriptionListenNewFiles;
  }

  download(filename: any) {
    console.log(filename);
    return this.http.post<Blob>(`${URL_PATH}/download`, { filename: filename.originalname },
    {
      responseType: 'blob' as 'json'
    })
    .pipe(
      map((file: Blob) => {
        // creando la url (http://localhost/dsjkdjsakdjaskka)
        const url = URL.createObjectURL(file);
        // <a></a>
        const a = document.createElement('a');
        // <a href="http://localhost/dsjkdjsakdjaskka"></a>
        a.href = url;
        // le pone nombre al archivo
        a.download = filename.originalname;
        a.click();
      }),
      mapTo(true),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getFiles(): Observable<any> {
    return this.http.get<any>(`${URL_PATH}/files`)
    .pipe(
      map((res: Array<any>) => {
        this.files = res;
        return res;
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
