import  { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { LogService } from '../../services/logging/log.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
    selector: "signup",
    templateUrl: "./signup.component.html",
    styleUrls: ['./signup.component.css'],
    providers: [ LogService ]
})
export class SignUpComponent{
    registerForm: FormGroup;

    // email = new FormControl('', [Validators.required, Validators.email])
    hide = true;
    // password = new FormControl('', [Validators.required, Validators.minLength(8)])
    // confirmPassword = new FormControl('', [Validators.required])

    constructor(
        iconRegistry: MatIconRegistry, 
        sanitizer: DomSanitizer,
        public auth: AuthService,
        private formBuilder: FormBuilder){
            iconRegistry.addSvgIcon(
                'google',
                sanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg'));
    }   
    
    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/g)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validators: this.MustMatch('password', 'confirmPassword')
        });

    }

    get f() { return this.registerForm.controls; }


    signUp(){
        if (this.registerForm.invalid){
            return;
        }

        this.auth.assertUserExist(this.registerForm.get('email').value).then(exist => {
            if (exist){
                this.registerForm.controls.email.setErrors({
                    alreadyRegistered: true
                })
            }
            else {
                this.auth.emailSignUp(this.registerForm.get('email').value, this.registerForm.get('password').value);                
            }
        });
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
    
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
                
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
    
}