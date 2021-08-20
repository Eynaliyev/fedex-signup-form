import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  passwordValidator,
  nonNumericOnly,
  lowerCaseExists,
  upperCaseExists,
} from 'src/validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  public createSignupForm(): FormGroup {
    return new FormGroup(
      {
        firstNameInputControl: new FormControl('', [
          Validators.required,
          nonNumericOnly(),
        ]),
        lastNameInputControl: new FormControl('', [
          Validators.required,
          nonNumericOnly(),
        ]),
        emailInputControl: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        passwordInputControl: new FormControl('', [
          lowerCaseExists(),
          upperCaseExists(),
          Validators.minLength(8),
          Validators.required,
        ]),
        submitBtnControl: new FormControl(''),
      },
      { validators: passwordValidator }
    );
  }
}
