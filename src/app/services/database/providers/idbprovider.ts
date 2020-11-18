import { Observable } from 'rxjs';

export interface IDbProvider{
    addDataToCollection(collectionName: string, data: any, documentName?: string)
    getCollectionValues(collectionName: string): Observable<any>;
    getCollectionValuesWithDocumentMetadata(collectionName: string): Observable<any>;
    removeDocumentFromCollection(collectionName: string, documentName: string);
}