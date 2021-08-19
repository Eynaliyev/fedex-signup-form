import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
export const validateAllFormFields = (formGroup: FormGroup): boolean => {
  let isValid = true;
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);

    if (control instanceof FormControl) {
      if (control.errors) {
        isValid = false;
      }
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    }
  });
  return isValid;
};

export function upperCaseExists(): ValidatorFn {
  const regEx = new RegExp('[A-Z]', 'g');
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !regEx.test(control.value);
    console.log(control.value, !forbidden);
    return forbidden ? { upperCase: { value: control.value } } : null;
  };
}

export function lowerCaseExists(): ValidatorFn {
  const regEx = new RegExp('[a-z]', 'g');
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !regEx.test(control.value);
    return forbidden ? { lowerCase: { value: control.value } } : null;
  };
}

export function nonNumericOnly(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = /\d/.test(control.value);
    return forbidden ? { hasNumber: { value: control.value } } : null;
  };
}

export function forbiddenStringValidator(
  str: string,
  nameRe: RegExp
): ValidationErrors | null {
  if (!str) return null;
  const forbidden = nameRe.test(str);
  return forbidden ? { forbiddenString: { value: str } } : null;
}

/** A hero's name can't match the hero's alter ego */
export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const firstName = control.get('firstNameInputControl')?.value;
  const lastName = control.get('lastNameInputControl')?.value;
  const password = control.get('passwordInputControl')?.value;
  const firstNameRe = new RegExp(firstName, 'gi');
  const lastNameRe = new RegExp(lastName, 'gi');
  if (
    forbiddenStringValidator(password, firstNameRe) ||
    forbiddenStringValidator(password, lastNameRe)
  ) {
    control.get('passwordInputControl')?.setErrors({ incorrect: true });
    return { invalidPassword: { value: password } };
  }
  return null;
};
