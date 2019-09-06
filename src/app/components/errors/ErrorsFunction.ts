import { FormGroup, NgForm } from '@angular/forms';
import * as _ from 'lodash';
export class ErrorsFunction {

  isInvalid(control: string, form: FormGroup | NgForm) {
    if (form.controls[control] && !_.isEmpty(form.controls[control].errors)) {
      return form.controls[control].errors && form.controls[control].touched;
    }
    return null;
  }
  returnErrors(control: string, form: FormGroup | NgForm) {
    if (form.controls[control] && !_.isEmpty(form.controls[control].errors)) {
    return form.controls[control].errors;
    }
    return null;
    // otra manera de acceder...
    // return this.form.get(control).errors;
  }
}
