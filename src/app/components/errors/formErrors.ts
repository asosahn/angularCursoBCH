import { NgForm, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
export class FormErrors {

  isInvalid(nombreCampo: string, form: NgForm | FormGroup) {
    if (form.controls[nombreCampo] && !_.isEmpty(form.controls[nombreCampo].errors)) {
      return form.controls[nombreCampo].errors && form.controls[nombreCampo].touched;
    }
    return null;
  }
  returnErrors(nombreCampo: string, form: NgForm | FormGroup) {
    if (form.controls[nombreCampo] && !_.isEmpty(form.controls[nombreCampo].errors)) {
    return form.controls[nombreCampo].errors;
    }
    return null;
    // otra manera de acceder...
    // return this.form.get(control).errors;
  }
}
