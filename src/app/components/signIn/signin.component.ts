import  { Component } from '@angular/core';

import { LogService } from '../../services/logging/log.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: "signin",
    templateUrl: "./signin.component.html",
    styleUrls: ['./signin.component.css'],
    providers: [ LogService ]
})
export class SignInComponent{
    email = new FormControl('', [Validators.required, Validators.email])
    hide = true;
    password = new FormControl('', [Validators.required, Validators.minLength(8)])

    constructor(
        log: LogService, 
        public auth: AuthService,){
    }   
    
    ngOnInit(): void {
    }

    getEmailErrorMessage(){
        if (this.email.hasError('required')){
            return 'You must enter a value';
        } else if (this.email.hasError('email')){
            return 'This is not valid value'
        } else {
            return '';
        }
    }

    getPasswordErrorMessage(){
        if (this.password.hasError('required')){
            return 'Password is required';
        } else if (this.password.hasError('minlength')){
            return 'Password should have at least 8 symbols';
        } else {
            return '';
        }
    }

    signIn(){
        if (this.email.invalid)
        {
            this.getEmailErrorMessage();
        } else if (this.password.invalid)
        {
            this.getPasswordErrorMessage();
        } else {
            this.auth.emailSignIn(this.email.value, this.password.value);
        }
    }
}