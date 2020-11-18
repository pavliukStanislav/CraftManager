import { Observable } from 'rxjs';
import { IDbProvider } from './providers/idbprovider';
import { LogService } from '../logging/log.service';
import { Component } from 'src/app/models/Component.model';
import { filter, map } from 'rxjs/operators';

export class ComponentsService{

    private collectionName: string = 'Components';
    recipesCollection: Observable<Component[]>;


    constructor(private dbProvider: IDbProvider, private log: LogService){
      this.recipesCollection = this.dbProvider.getCollectionValues(this.collectionName)
    }

    getComponentsList(userId: string){
      return this.recipesCollection.pipe(
        map(x => x.filter(user => user.userId == userId))
       );
    }

    addDataToCollection(data: any, documentName?: string){
      this.log.info("Сreating new component");

      this.dbProvider.addDataToCollection(this.collectionName, data, documentName);
    }

    deleteComponent(name: string, userId: string)
    {
      this.dbProvider.getCollectionValuesWithDocumentMetadata(this.collectionName).subscribe(data =>
      {
        data.forEach(element => {
          if (element.payload.doc.data().name == name && element.payload.doc.data().userId == userId){
            this.dbProvider.removeDocumentFromCollection(this.collectionName, element.payload.doc.id);
          }
        });
      });
    }
}