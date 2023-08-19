import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchingPasswordsValidator: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    let formGroup = form as FormGroup;
    let pass = formGroup.controls['Password'].value;
    let confirmPass = formGroup.controls['ConfirmPassword'].value;
    if (pass !== confirmPass) return { matchingPasswordsError: true };
    return null;
  };