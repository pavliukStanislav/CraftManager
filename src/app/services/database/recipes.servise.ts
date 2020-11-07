import { Observable } from 'rxjs';
import { IDbProvider } from './providers/idbprovider';
import { LogService } from '../logging/log.service';
import { map } from 'rxjs/operators';
export interface Shirt { name: string; price: number; }
export class RecipesService{

    private collectionName: string = 'Recieps';


    constructor(private dbProvider: IDbProvider, private log: LogService){}

    getRecipesList(): Array<string> {
        this.log.info("Getting recipes list");
        var recipes = [];

        this.dbProvider.getDocumentsFromColection(this.collectionName).subscribe((ss) => {
            ss.docs.forEach((doc) => {
              recipes.push(doc.id);
            });
          });

        return recipes;
    }
}