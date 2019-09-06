import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AlertasService } from './services/alertas.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  userActivity;
  userInactive: Subject<any> = new Subject();
  showLoading: Subscription;
  private loading$ = new Subject<any>();
  showOrHideLoading: Subscription;
 constructor(private spinner: NgxSpinnerService, private alertService: AlertasService) {
  this.showOrHideLoading = this.alertService.loadingSubscription().subscribe(
      ((flag: boolean) => {
        if (flag) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      })
    );
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

ngOnDestroy(): void {
  this.showOrHideLoading.unsubscribe();
}
}
