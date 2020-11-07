import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface IDbProvider{
    addDataToCollection(collectionName: string, data: any);
    getDocumentsFromColection(collectionName: string) : Observable<any>;
}