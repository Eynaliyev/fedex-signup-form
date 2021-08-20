import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

import { AuthService } from 'src/services/auth.service';
import { FormService } from 'src/services/form.service';
import { User } from 'src/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/components/snackbar/snackbar.component';
import { FIELD_NAMES } from './constants';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  warningMessage: string = '';
  signupFormGroup: FormGroup;
  errorMessage: string = '';
  subscription?: Subscription;
  res?: User;

  constructor(
    private authSrvc: AuthService,
    private _snackBar: MatSnackBar,
    private formSrvc: FormService
  ) {
    this.signupFormGroup = this.formSrvc.createSignupForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSignupClick() {
    if (this.signupFormGroup.valid) {
      this.onSubmit();
    } else {
      this.updateErrorMessage();
    }
  }

  private updateErrorMessage(): void {
    this.errorMessage = this.getFormValidationErrors()[0];
  }

  private getFormValidationErrors(): string[] {
    return Object.keys(this.signupFormGroup.controls)
      .map((key: string) => {
        const controlErrors: ValidationErrors | null | undefined =
          this.signupFormGroup?.get(key)?.errors;
        return this.getForrmattedErrorMessage(key, controlErrors);
      })
      .filter((el) => el);
  }

  private getForrmattedErrorMessage(
    fieldName: string,
    errors: ValidationErrors | null | undefined
  ): string {
    if (!errors) return '';

    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey === 'minlength') {
      return 'Password must be minimum 8 characters long';
    }
    const errorDescription = errors[firstErrorKey].value || 'invalid';

    return `${FIELD_NAMES[fieldName] || ''} ${errorDescription}`;
  }

  private openSnackBar(data: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data,
    });
  }

  onSubmit() {
    const userData = {
      firstName: this.signupFormGroup.controls.firstNameInputControl.value,
      lastName: this.signupFormGroup.controls.lastNameInputControl.value,
      email: this.signupFormGroup.controls.emailInputControl.value,
    };
    this.subscription = this.authSrvc.submitUser(userData).subscribe(
      (res) => {
        this.res = res;
        this.openSnackBar(`Signup successful, your id is: ${this.res?.id}`);
      },
      (err) => (this.errorMessage = 'HTTP Error'),
      () => console.log('HTTP request completed.')
    );
  }
}
