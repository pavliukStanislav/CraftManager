import  { Component, ViewChild } from '@angular/core';
import { FirestoreDbProvider} from '../../services/database/providers/firestore.dbprovider';
import { RecipesService } from '../../services/database/recipes.servise';
import { LogService } from '../../services/logging/log.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: "recipes-list",
    templateUrl: "./recipesList.component.html",
    styleUrls: ['./recipesList.component.css'],
    providers: [ LogService ]
})
export class RecipesListComponent{
    recipesService: RecipesService;
    columnsToDisplay : string[] = ['name', 'cost', 'self_cost', 'profit'];

    //recipes: RecipesListItem[]
    recipes: MatTableDataSource<RecipesListItem>;

    @ViewChild(MatPaginator) pagonator: MatPaginator;

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
                this.recipes = new MatTableDataSource<RecipesListItem>(recipes.map(x => {
                    return {
                        name: x.name,
                        cost: x.cost,
                        selfCost: x.cost,
                        profit: "+2.3g | +14%"
                    }
                }));

                this.recipes.paginator = this.pagonator;
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
