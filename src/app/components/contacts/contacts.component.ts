import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ContactMessagesService } from 'src/app/services/database/contactMessages.servise';
import { FirestoreDbProvider } from 'src/app/services/database/providers/firestore.dbprovider';
import { LogService } from 'src/app/services/logging/log.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent{
  createMessageForm: any;

  contactMessageService: ContactMessagesService;

  constructor(
    private formBuilder: FormBuilder,
    log: LogService,
    private snackBar: MatSnackBar,
    fireStorage: AngularFirestore,) {
      let storageProvider = new FirestoreDbProvider(fireStorage);
      this.contactMessageService = new ContactMessagesService(storageProvider, log);
   }

  createMessage(){
    this.contactMessageService.addDataToCollection(this.createMessageForm.value);

    this.snackBar.open('Thanks!', 'Ok', {
      duration: 2000
    });
        
  }

  ngOnInit(): void {
    this.createMessageForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/g)]],
      name: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  get f() {return this.createMessageForm.controls}
}
