import  { Component } from '@angular/core';
import { FirestoreDbProvider} from '../../services/database/providers/firestore.dbprovider';
import { RecipesService } from '../../services/database/recipes.servise';
import { LogService } from '../../services/logging/log.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: "recipes-list",
    templateUrl: "./recipesList.component.html",
    styleUrls: ['./recipesList.component.css'],
    providers: [ LogService ]
})
export class RecipesListComponent{
    recipesService: RecipesService;

    recipes: RecipesListItem[]
    columnsToDisplay : string[] = ['name', 'cost', 'self_cost', 'profit'];

    constructor(
        fireStorage: AngularFirestore, 
        log: LogService,
        public auth: AuthService,){
        let storageProvider = new FirestoreDbProvider(fireStorage);
        this.recipesService = new RecipesService(storageProvider, log);
    }   
    
    ngOnInit(): void {
        this.auth.user$.subscribe(user =>
        {
            this.recipesService.getRecipesList(user.uid).subscribe(recipes => {
                this.recipes = recipes.map(x => {
                    return {
                        name: x.name,
                        cost: x.cost,
                        selfCost: x.cost,
                        profit: "+2.3g | +14%"
                    }
                });
            });
        });
    }
}

interface RecipesListItem{
    name: string;
    cost: number;
    selfCost: number;
    profit: string; // "+2.3g | +14%" "-0.4g | -5%"
}
