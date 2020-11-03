import  { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { FirestoreStorageProvider } from '../../services/storage/providers/firestore.storageprovider';
import { ImagesService } from 'src/app/services/storage/images.service';
import { LogService } from 'src/app/services/logging/log.service';
import { Observable } from 'rxjs';

@Component({
    selector: "ps-home",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css'],
    providers: [ LogService ]
})
export class HomeComponent{
    photoUrl: Observable<string | null>;

    imagesService: ImagesService;

    constructor(fireStorage: AngularFireStorage, log: LogService){
        let storageProvider = new FirestoreStorageProvider(fireStorage);
        this.imagesService = new ImagesService(storageProvider, log);
    }   
    
    ngOnInit(): void {
        this.photoUrl = this.imagesService.getMainPhoto();
    }
}