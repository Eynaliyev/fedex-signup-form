import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

describe('FormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: FormService = TestBed.get(FormService);
    expect(service).toBeTruthy();
  });

  describe('createForm', () => {
    describe('login control', () => {
      it('should has required validator', () => {
        const service: FormService = TestBed.get(FormService);
        const form: FormGroup = service.createSignupForm();
        const control: AbstractControl | null = form.get('firstName');
        if (control) {
          control.setValue(null);
          expect(control.hasError('required')).toBeTruthy();
        }
      });

      it('should has min length validator', () => {
        const service: FormService = TestBed.get(FormService);
        const form: FormGroup = service.createSignupForm();
        const control: AbstractControl | null = form.get('password');
        if (control) {
          control.setValue('12');
          expect(control.hasError('minlength')).toBeTruthy();
        }
      });
    });
  });
});
