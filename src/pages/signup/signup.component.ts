import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateAllFormFields, passwordValidator } from '../../validator';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  warningMessage: string = '';
  res: User | null = null;
  signupFormGroup: FormGroup;

  constructor(private authSrvc: AuthService) {
    this.signupFormGroup = new FormGroup(
      {
        firstNameInputControl: new FormControl('', [Validators.required]),
        lastNameInputControl: new FormControl('', [Validators.required]),
        emailInputControl: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        passwordInputControl: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        submitBtnControl: new FormControl(''),
      },
      { validators: passwordValidator }
    );
  }

  onSignupClick() {
    if (validateAllFormFields(this.signupFormGroup)) {
      console.log('all valid, calling signup field', this.signupFormGroup);
      this.onSubmit();
    }
  }

  onSubmit() {
    const userData = {
      firstName: this.signupFormGroup.controls.firstNameInputControl.value,
      lastName: this.signupFormGroup.controls.lastNameInputControl.value,
      email: this.signupFormGroup.controls.emailInputControl.value,
    };
    console.log(userData);
    this.authSrvc.submitUser(userData).subscribe((res) => {
      this.res = res;
    });
  }
}
