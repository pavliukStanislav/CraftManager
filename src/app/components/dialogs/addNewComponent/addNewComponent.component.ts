import  { Component }                                                   from '@angular/core';

import { LogService }                                                   from '../../../services/logging/log.service';
import { FormBuilder, FormControl, FormGroup, Validators }              from '@angular/forms';
import { AuthService }                                                  from 'src/app/services/auth/auth.service';
import { ComponentsService }                                            from 'src/app/services/database/components.servise';
import { FirestoreDbProvider }                                          from 'src/app/services/database/providers/firestore.dbprovider';
import { AngularFirestore }                                             from '@angular/fire/firestore';
import { MatSnackBar }                                                  from '@angular/material/snack-bar';
import { MatDialogRef }                                                 from '@angular/material/dialog';

@Component({
    selector: "add-new-component",
    templateUrl: "./addNewComponent.component.html",
    styleUrls: ['./addNewComponent.component.css'],
    providers: [ LogService ]
})
export class AddNewComponentComponent{
    addNewComponentForm: FormGroup;
    componentsService: ComponentsService;
    private currentUserId: string;

    constructor(
            public auth: AuthService,
            private fb: FormBuilder,
            fireStorage: AngularFirestore,
            log: LogService,
            private snackBar: MatSnackBar,
            public dialogRef: MatDialogRef<AddNewComponentComponent>){
        let storageProvider = new FirestoreDbProvider(fireStorage);
        this.componentsService = new ComponentsService(storageProvider, log);
    }   
    

    ngOnInit(): void {
        this.addNewComponentForm = this.fb.group({
            name: new FormControl('', Validators.required),
            cost: new FormControl('', Validators.required)
        });

        this.auth.user$.subscribe(user =>
            this.currentUserId = user.uid);
    }   

    createComponent(){
        this.componentsService.addDataToCollection(
        {
            "name": this.addNewComponentForm.get('name').value,            
            "cost": this.addNewComponentForm.get('cost').value,
            "userId": this.currentUserId
        });

        this.dialogRef.close("true");
        this.snackBar.open('Component added!', 'Ok', {
            duration: 2000
        });
    }
}