import { IStorageProvider } from './istorageprovider';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export class FirestoreStorageProvider implements IStorageProvider {    
    constructor(private storage: AngularFireStorage){        
    }

    getFileUrl(fileName: string): Observable<any> {
        return this.storage.ref(fileName).getDownloadURL();
    }
}