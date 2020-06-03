import { AbstractControl } from "@angular/forms";

export function PasswordValidator(control: AbstractControl): {[key: string] : boolean} |null{
    const password = control.get('password');
    const password_confirmation = control.get('password_confirmation');
    if(password.pristine || password_confirmation.pristine){
        return null;
    }
    return password && password_confirmation && 
    password.value != password_confirmation.value ?
    {'misMatch': true} : null;
}