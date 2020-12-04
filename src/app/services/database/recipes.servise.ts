import { Observable } from 'rxjs';
import { IDbProvider } from './providers/idbprovider';
import { LogService } from '../logging/log.service';
import { Recipe } from 'src/app/models/Recipe.model';
import { filter, map } from 'rxjs/operators';

export class RecipesService{

    private collectionName: string = 'Recieps';
    recipesCollection: Observable<Recipe[]>;


    constructor(private dbProvider: IDbProvider, private log: LogService){
      this.recipesCollection = this.dbProvider.getCollectionValues(this.collectionName);
    }

    getRecipesList(userId: string){
       return this.recipesCollection.pipe(
        map(x => x.filter(user => user.userId == userId))
       );
    }

    addDataToCollection(data: any, documentName?: string){
      this.log.info("Сreating new recipe");

      this.dbProvider.addDataToCollection(this.collectionName, data, documentName);
    }

    updateRecipe(data: Recipe){
      this.dbProvider.getCollectionValuesWithDocumentMetadata(this.collectionName).subscribe(collection =>
        {
          collection.forEach(element => {
            if (element.payload.doc.data().name == data.name && element.payload.doc.data().userId == data.userId){
              this.dbProvider.updateDocumentInCollection(this.collectionName, element.payload.doc.id, data);
            }
          });
        }
      )
    }

    deleteRecipe(name: string, userId: string){
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