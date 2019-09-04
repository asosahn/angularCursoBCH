import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

interface ShowError {
  required?: any;
  pattern?: any;
  minlength?: any;
  maxlength?: any;
}

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {
  @Input() errors: ShowError;
  constructor() { }

  ngOnInit() {
  }

  getErrors( errors: ShowError ) {
    if (!_.isEmpty(errors)) {
      // { errors: { required: true } }
      // { errors: { minlength: true } }
      // ['required', 'minlength']
      return Object.keys(errors).length > 0 ? Object.keys(errors)[0] : false;
    }
    return false;
  }

}
