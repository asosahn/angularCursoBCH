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
 }

ngOnDestroy(): void {
  this.showOrHideLoading.unsubscribe();
}
}
