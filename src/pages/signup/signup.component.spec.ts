import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup.component';
import { AuthService } from 'src/services/auth.service';

describe('SignupComponent', () => {
  const INVALID_NAME = '123hello';
  const VALID_VALUE = 'hi';
  const VALID_EMAIL = 'r@r.com';
  const VALID_PASSWORD = 'Rr123123123';
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SignupComponent],
        imports: [
          BrowserAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          MatButtonModule,
          MatFormFieldModule,
          MatInputModule,
          HttpClientTestingModule,
          MatSnackBarModule,
        ],
        providers: [AuthService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not trigger submit event if the value is NOT VALID', () => {
    spyOn(component, 'onSubmit');
    component.signupFormGroup.controls.firstNameInputControl.setValue(
      INVALID_NAME
    );
    component.signupFormGroup.controls.lastNameInputControl.setValue(
      VALID_VALUE
    );
    component.signupFormGroup.controls.emailInputControl.setValue(VALID_EMAIL);
    component.signupFormGroup.controls.passwordInputControl.setValue(
      VALID_PASSWORD
    );
    component.onSignupClick();
    expect(component.onSubmit).not.toHaveBeenCalled();
  });

  it('should trigger submit event if the value is VALID', () => {
    spyOn(component, 'onSubmit');
    component.signupFormGroup.controls.firstNameInputControl.setValue(
      VALID_VALUE
    );
    component.signupFormGroup.controls.lastNameInputControl.setValue(
      VALID_VALUE
    );
    component.signupFormGroup.controls.emailInputControl.setValue(VALID_EMAIL);
    component.signupFormGroup.controls.passwordInputControl.setValue(
      VALID_PASSWORD
    );
    component.onSignupClick();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
