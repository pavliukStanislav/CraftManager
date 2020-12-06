import { Component } from '@angular/core';

import { LogService } from '../../services/logging/log.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    hide = true;

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
            } else {
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