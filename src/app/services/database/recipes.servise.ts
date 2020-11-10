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
}