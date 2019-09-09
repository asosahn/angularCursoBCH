import { AlertasService } from 'src/app/services/alertas.service';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  // userActivity;
  // userInactive: Subject<any> = new Subject();
  SubscribeToLoading: Subscription;
 constructor(private spinner: NgxSpinnerService,
             private alertServices: AlertasService) {

 this.SubscribeToLoading = this.alertServices.subscribeToLoadingSubject()
 .subscribe(
   ((show: boolean) => {
     if (show) {
      this.spinner.show();
     } else  {
      this.spinner.hide();
     }
   })
 );

  // this.spinner.show();
  // setTimeout(() => {
    /** spinner ends after 5 seconds */
  //   this.spinner.hide();
  // }, 5000);






  // this.setTimeout();
  // this.userInactive.subscribe(() => {
  //   Swal.fire({
  //     title: 'Error!',
  //     text: 'Sesión de mas de 20 seg sin actividad',
  //     type: 'error',
  //     confirmButtonText: 'Aceptar'
  //   });
  // });
 }

//  setTimeout() {
//   this.userActivity = setTimeout(() => this.userInactive.next(undefined), 20000);
// }

// @HostListener('window:mousemove')
// @HostListener('window:keyup')
// refresUserState() {
//   clearTimeout(this.userActivity);
//   this.setTimeout();
// }

ngOnDestroy() {
  this.SubscribeToLoading.unsubscribe();
}

}
