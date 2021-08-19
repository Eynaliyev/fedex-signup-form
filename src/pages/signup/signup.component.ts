import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  passwordValidator,
  nonNumericOnly,
  lowerCaseExists,
  upperCaseExists,
} from '../../validator';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';
import { FIELD_NAMES } from './constants';
@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  warningMessage: string = '';
  res: User | null = null;
  signupFormGroup: FormGroup;
  errorMessage: string = '';

  constructor(private authSrvc: AuthService, private _snackBar: MatSnackBar) {
    this.signupFormGroup = new FormGroup(
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

  updateErrorMessage(): void {
    this.errorMessage = this.getFormValidationErrors()[0];
  }

  getFormValidationErrors(): string[] {
    return Object.keys(this.signupFormGroup.controls)
      .map((key: string) => {
        const controlErrors: any = this.signupFormGroup?.get(key)?.errors;
        if (controlErrors != null) {
          const firstErrorKey = Object.keys(controlErrors)[0];
          if (firstErrorKey === 'minLength')
            return 'Password must be minimum 8 characters long';
          return `${FIELD_NAMES[key] || ''} ${
            controlErrors[firstErrorKey].value || 'invalid'
          }`;
        }
        return '';
      })
      .filter((el) => el);
  }

  openSnackBar(data: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data,
    });
  }

  onSignupClick() {
    if (this.signupFormGroup.valid) {
      console.log(this.signupFormGroup);
      this.onSubmit();
    } else {
      this.updateErrorMessage();
    }
  }

  onSubmit() {
    const userData = {
      firstName: this.signupFormGroup.controls.firstNameInputControl.value,
      lastName: this.signupFormGroup.controls.lastNameInputControl.value,
      email: this.signupFormGroup.controls.emailInputControl.value,
    };
    this.authSrvc.submitUser(userData).subscribe(
      (res) => {
        this.res = res;
        this.openSnackBar(`Signup successful, your id is: ${this.res?.id}`);
      },
      (err) => (this.errorMessage = 'HTTP Error'),
      () => console.log('HTTP request completed.')
    );
  }
}
