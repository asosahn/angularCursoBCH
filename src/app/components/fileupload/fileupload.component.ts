
import { Subscription } from 'rxjs';
import { UploadService } from './../../services/upload/upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit, OnDestroy {
  form: FormGroup;
  uploadResponse;
  files;
  searchText;
  allFilesUploaded: Array<any> = [];
  // para suscripción a canal de carga de archivos
  susbscriptionToFiles: Subscription;
  constructor(private uploadService: UploadService) {
    this.form = new FormGroup({
      file: new FormControl('', Validators.required)
    });
    // suscripción para escuchar cuando se crea un archivo nuevo
    this.susbscriptionToFiles = this.uploadService.canSubscribeToNewFiles().subscribe
      ((filesFromSubscription: any) => {
        console.log('escuchando canal');
        this.allFilesUploaded = filesFromSubscription;
      });

   }

   onChangeFile($event: Event | any) {
     this.files = $event;
     if ($event.target.files.length > 0 ) {
       this.form.controls.file.setValue($event.target.files[0]);
     }
   }

   ngOnDestroy() {
    this.susbscriptionToFiles.unsubscribe();
  }

   saveForm() {
     if (this.form.valid) {
      const formData = new FormData();
      formData.append('file', this.form.value.file, this.form.value.file.name);
      this.uploadService.upload(formData)
      .subscribe(
        ((res: any) => {
          console.log(res);
          if (res && res.status === 'progress') {
            this.uploadResponse = res;
            console.log(res.message);
            if (res.message === 100) {
              setTimeout(() => {
                this.uploadResponse.message = undefined;
              }, 2000);
            }
          } else if (res.file && res.file.originalname) {
            // this.allFiles.push(res.file);
            console.log(res);
          }
        }),
        err => console.log(err)
      );
     }
   }

  BajarArchivo(file: any) {
    file.loading = true;
    this.uploadService.download(file).subscribe(
      (res: any) => {
        if (res && res.status === 'progress') {
          file.message = res.message;
          if (res.message === 100) {
              file.message = undefined;
          }
        } else if (res === true) {
          file.loading = false;
        }
      }
    );
  }

  ngOnInit() {
    this.uploadService.getFiles().subscribe(
      ((filesFromServer: any) => {
        this.allFilesUploaded = filesFromServer;
      }), (err => {
        console.log(err);
      })
    );
  }

}
