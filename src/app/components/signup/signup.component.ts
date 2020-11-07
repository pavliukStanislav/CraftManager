import  { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { LogService } from '../../services/logging/log.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: "signup",
    templateUrl: "./signup.component.html",
    styleUrls: ['./signup.component.css'],
    providers: [ LogService ]
})
export class SignUpComponent{
    email = new FormControl('', [Validators.required, Validators.email])
    hide = true;
    password = new FormControl('', [Validators.required, Validators.minLength(8)])

    constructor(
        public auth: AuthService){
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

    signUp(){
        if (this.email.invalid)
        {
            this.getEmailErrorMessage();
        } else if (this.password.invalid)
        {
            this.getPasswordErrorMessage();
        } else {
            this.auth.emailSignUp(this.email.value, this.password.value);
        }
    }
}