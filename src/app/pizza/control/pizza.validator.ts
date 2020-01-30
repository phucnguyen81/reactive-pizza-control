import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class PizzaValidators {
  static error(control: AbstractControl): string {
    const errors: ValidationErrors = (
      (control.errors && control.touched) ? control.errors : {}
    );
    if (errors.required) { return 'Field is required'; }
    if (errors.minlength) {
      const requiredLength = errors.minlength.requiredLength;
      return `Min of ${requiredLength} characters`;
    }
    if (errors.match) {
      const name = errors.match.name;
      return `${name} must match`;
    }
    const error = Object.keys(errors) || [''];
    return error[0];
  }

  static valueMatch(other: AbstractControl, name: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (!(other && control)) return null;
      return (
        other.value === control.value ? null : { match: { name } }
      );
    }
  }
}
