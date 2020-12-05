import  { Component } from '@angular/core';

import { LogService } from '../../services/logging/log.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    selector: "signin",
    templateUrl: "./signin.component.html",
    styleUrls: ['./signin.component.css'],
    providers: [ LogService ]
})
export class SignInComponent{
    loginForm: FormGroup;
    hide = true;

    constructor(
        iconRegistry: MatIconRegistry, 
        sanitizer: DomSanitizer,
        log: LogService, 
        public auth: AuthService,
        private formBuilder: FormBuilder){
            iconRegistry.addSvgIcon(
                'google',
                sanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg'));
    }   
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/g)]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }    

    get f() { return this.loginForm.controls; }

    signIn(){
        if (this.loginForm.invalid){
            return;
        }

        this.auth.assertUserExist(this.loginForm.get('email').value).then(exist => {
            if (exist){
                this.auth.emailSignIn(this.loginForm.get('email').value, this.loginForm.get('password').value);
            } else {
                this.loginForm.controls.email.setErrors({
                    notRegistered: true
                })
            }
        })        
    }
}