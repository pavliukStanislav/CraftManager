import { Observable } from 'rxjs';

export interface IDbProvider{
    addDataToCollection(collectionName: string, data: any, documentName?: string)
    getCollectionValues(collectionName: string): Observable<any>;
}