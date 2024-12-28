import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class ChaosValidators {

  static citizenId: ValidatorFn = (control:AbstractControl) : ValidationErrors | null => {
    const thaiId = control.value;

    if(!thaiId) return null;
    const m = thaiId.match(/(\d{12})(\d)/);
    if (!m) {
      return { citizenId: true };
    }

    const digits = m[1].split('');
    const sum = digits.reduce((total: number, digit: string, i: number) => {
      return total + (13 - i) * +digit;
    }, 0);

    const lastDigit = `${(11 - sum % 11) % 10}`
    const inputLastDigit = m[2]
    if (lastDigit !== inputLastDigit) {
      return { citizenId: false };
    }

    return null;
  }

  static email: ValidatorFn = (control:AbstractControl) : ValidationErrors | null => {
    if(!control.value) return null;
    let regex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return control.value.match(regex) ? null : { email: false };
  }

  static thaiName: ValidatorFn = (control:AbstractControl) : ValidationErrors | null => {
    if(!control.value) return null;
    let regex: RegExp = /(^[ก-๏\s]+$)/u;
    return control.value.match(regex) ? null : { thaiName: false };
  }

  static englishName: ValidatorFn = (control:AbstractControl) : ValidationErrors | null => {
    if(!control.value) return null;
    let regex: RegExp = /(^[a-zA-Z\s]+$)/u;
    return control.value.match(regex) ? null : { englishName: false };
  }
  
  static userName: ValidatorFn = (control:AbstractControl) : ValidationErrors | null => {
    if(!control.value) return null;
    let regex: RegExp = /(^[a-zA-Z0-9\s]+$)/u;
    return control.value.match(regex) ? null : { englishName: false };
  }

}
