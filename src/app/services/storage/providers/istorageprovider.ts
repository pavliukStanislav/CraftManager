import { Observable } from 'rxjs';

export interface IStorageProvider{
    getFileUrl(fileName : string): Observable<any>;
}