import { Observable } from 'rxjs';
import { IDbProvider } from './providers/idbprovider';
import { LogService } from '../logging/log.service';
import { Component } from 'src/app/models/Component.model';
import { filter, map } from 'rxjs/operators';

export class ContactMessagesService{

    private collectionName: string = 'ContactMessages';
    recipesCollection: Observable<Component[]>;


    constructor(private dbProvider: IDbProvider, private log: LogService){
      this.recipesCollection = this.dbProvider.getCollectionValues(this.collectionName)
    }

    getMessagesList(userId: string){
      return this.recipesCollection.pipe(
        map(x => x.filter(user => user.userId == userId))
       );
    }

    addDataToCollection(data: any, documentName?: string){
      this.log.info("Сreating new message");

      this.dbProvider.addDataToCollection(this.collectionName, data, documentName);
    }    
}