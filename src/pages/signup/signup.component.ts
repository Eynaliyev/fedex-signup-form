import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  validateAllFormFields,
  passwordValidator,
  nonNumericOnly,
  lowerCaseExists,
  upperCaseExists,
} from '../../validator';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  warningMessage: string = '';
  res: User | null = null;
  signupFormGroup: FormGroup;

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
          Validators.required,
          Validators.minLength(8),
          lowerCaseExists(),
        ]),
        submitBtnControl: new FormControl(''),
      },
      { validators: passwordValidator }
    );
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: `Signup successful, your id is: ${this.res?.id}`,
    });
  }

  onSignupClick() {
    if (validateAllFormFields(this.signupFormGroup)) {
      this.onSubmit();
    }
  }

  onSubmit() {
    const userData = {
      firstName: this.signupFormGroup.controls.firstNameInputControl.value,
      lastName: this.signupFormGroup.controls.lastNameInputControl.value,
      email: this.signupFormGroup.controls.emailInputControl.value,
    };
    this.authSrvc.submitUser(userData).subscribe((res) => {
      this.res = res;
      this.openSnackBar();
    });
  }
}
