import { IDbProvider } from './idbprovider';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

export class FirestoreDbProvider implements IDbProvider {    
    constructor(private firestore: AngularFirestore){        
    }

    addDataToCollection(collectionName: string, data: any, documentName?: string) {
        if (documentName){
            this.firestore.collection(collectionName).doc(documentName).set(data);
        } else {
            this.firestore.collection(collectionName).add(data);
        }
    }

    getCollectionValues(collectionName: string) : Observable<any>{        
        return this.firestore.collection(collectionName).valueChanges();
    }

    getCollectionValuesWithDocumentMetadata(collectionName: string) : Observable<any>{        
        return this.firestore.collection(collectionName).snapshotChanges();
    }

    removeDocumentFromCollection(collectionName: string, documentName: string){
        return this.firestore.collection(collectionName).doc(documentName).delete();
    }    
}