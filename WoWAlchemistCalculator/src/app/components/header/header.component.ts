import { Component, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatMenuTrigger } from '@angular/material/menu';
import { AngularFireAnalytics } from '@angular/fire/analytics';

import 'firebase/storage';

import { FirestoreStorageProvider } from '../../services/storage/providers/firestore.storageprovider';
import { CvsService } from 'src/app/services/storage/cvs.service';
import { LogService } from 'src/app/services/logging/log.service';

@Component({
    selector: 'ps-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [ LogService ]
})
export class HeaderComponent{
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    cvService: CvsService;

    constructor(fireStorage: AngularFireStorage, log: LogService, private analytics: AngularFireAnalytics){
        let storageProvider = new FirestoreStorageProvider(fireStorage);
        this.cvService = new CvsService(storageProvider, log)
    }    

    downloadCvPdf(){
        this.analytics.logEvent('downloadingPdf');
        this.cvService.getCvPdfFileUrl().subscribe(function(url){
            window.open(url);
        });
    }

    downloadCvDocx(){
        this.analytics.logEvent('downloadingDocx');
        this.cvService.getCvDocxFileUrl().subscribe(function(url){
            window.open(url);
        });
    }
}