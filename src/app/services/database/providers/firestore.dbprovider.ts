import { IDbProvider } from './idbprovider';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

export class FirestoreDbProvider implements IDbProvider {    
    constructor(private firestore: AngularFirestore){        
    }
    addDataToCollection(collectionName: string, data: any) {
        this.firestore.collection(collectionName).add(data);
    }

    getDocumentsFromColection(collectionName: string) : Observable<any>{        
        return this.firestore.collection(collectionName).get();
    }
}