import { UploadService } from './../../services/upload/upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  form: FormGroup;
  uploadResponse;
  files;
  constructor(private uploadService: UploadService) {
    this.form = new FormGroup({
      file: new FormControl('', Validators.required)
    });

   }

   onChangeFile($event: Event | any) {
     this.files = $event;
     if ($event.target.files.length > 0 ) {
       this.form.controls.file.setValue($event.target.files[0]);
     }
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
              // this.uploadResponse.message = undefined;
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

  ngOnInit() {
  }

}
