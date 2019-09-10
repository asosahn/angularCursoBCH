
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map, mapTo, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const URL_PATH = 'http://bch.hazsk.com/auth';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(file: any, params: any) {
    return this.http.post<any>(`${URL_PATH}/upload`, {
      file,
      data: params
    }, {
      reportProgress: true,
      observe: 'events'
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
            return `evento no tomado: ${event.type}`;
        }
      })
    );
  }

  download(filename: any) {
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
}
