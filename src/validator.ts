import { ValidatorFn } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function upperCaseExists(): ValidatorFn {
  const regEx = new RegExp('(?=.*[A-Z])');
  return (control: AbstractControl): ValidationErrors | null => {
    const escapedStr = control.value.replace(/\\/g, '\\\\');
    const forbidden = !regEx.test(escapedStr);
    return forbidden
      ? { upperCase: { value: 'should have at least 1 uppercase character' } }
      : null;
  };
}

export function lowerCaseExists(): ValidatorFn {
  const regEx = new RegExp('(?=.*[a-z])');
  return (control: AbstractControl): ValidationErrors | null => {
    const escapedStr = control.value.replace(/\\/g, '\\\\');
    const forbidden = !regEx.test(escapedStr);
    return forbidden
      ? { lowerCase: { value: 'should have at least 1 lowercase character' } }
      : null;
  };
}

export function nonNumericOnly(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const escapedStr = control.value.replace(/\\/g, '\\\\');
    const forbidden = /\d/.test(escapedStr);
    return forbidden
      ? { hasNumber: { value: 'should not have numbers' } }
      : null;
  };
}

function forbiddenStringValidator(
  str: string,
  nameRe: RegExp
): ValidationErrors | null {
  if (!str) return null;
  const forbidden = nameRe.test(str);
  return forbidden
    ? { forbiddenString: { value: 'should not include first or last name' } }
    : null;
}

/** A hero's name can't match the hero's alter ego */
export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const firstName = control
    .get('firstNameInputControl')
    ?.value.replace(/\\/g, '\\\\');
  const lastName = control
    .get('lastNameInputControl')
    ?.value.replace(/\\/g, '\\\\');
  const password = control
    .get('passwordInputControl')
    ?.value.replace(/\\/g, '\\\\');
  const firstNameRe = new RegExp(firstName, 'gi');
  const lastNameRe = new RegExp(lastName, 'gi');
  const error = {
    invalidPassword: { value: 'should not include first or last name' },
  };
  if (
    forbiddenStringValidator(password, firstNameRe) ||
    forbiddenStringValidator(password, lastNameRe)
  ) {
    control.get('passwordInputControl')?.setErrors(error);
    return error;
  }
  return null;
};
