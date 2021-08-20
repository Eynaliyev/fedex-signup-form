import { AbstractControl } from '@angular/forms';
import { upperCaseExists, lowerCaseExists, nonNumericOnly } from './validator';

describe('upperCaseExists', () => {
  const validatoroFunc = upperCaseExists();
  it('shuld return error when value has no uppercase', () => {
    const invalidValue = { value: 'test' } as AbstractControl;
    expect(validatoroFunc(invalidValue)).not.toBeNull();
  });
  it('shuld return null when value has uppercase character', () => {
    const validValue = { value: 'Test' } as AbstractControl;
    expect(validatoroFunc(validValue)).toBeNull();
  });
});

describe('lowerCaseExists', () => {
  const validatoroFunc = lowerCaseExists();
  it('shuld return error when value has no lowercase', () => {
    const invalidValue = { value: 'TEST' } as AbstractControl;
    expect(validatoroFunc(invalidValue)).not.toBeNull();
  });
  it('shuld return null when value has lowercase character', () => {
    const validValue = { value: 'test' } as AbstractControl;
    expect(validatoroFunc(validValue)).toBeNull();
  });
});

describe('nonNumericOnly', () => {
  const validatoroFunc = nonNumericOnly();
  it('shuld return error when value has numbers', () => {
    const invalidValue = { value: '123' } as AbstractControl;
    expect(validatoroFunc(invalidValue)).not.toBeNull();
  });
  it('shuld return null when value has nu numbers', () => {
    const validValue = { value: 'Test' } as AbstractControl;
    expect(validatoroFunc(validValue)).toBeNull();
  });
});
