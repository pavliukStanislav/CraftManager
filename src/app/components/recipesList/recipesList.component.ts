import { Component, ViewChild }         from '@angular/core';
import { FirestoreDbProvider}           from '../../services/database/providers/firestore.dbprovider';
import { RecipesService }               from '../../services/database/recipes.servise';
import { LogService }                   from '../../services/logging/log.service';
import { AngularFirestore }             from '@angular/fire/firestore';
import { AuthService }                  from 'src/app/services/auth/auth.service';
import { MatTableDataSource }           from '@angular/material/table';
import { MatPaginator }                 from '@angular/material/paginator';
import { MatDialog }                    from '@angular/material/dialog';
import { DeleteDialogComponent }        from '../dialogs/removeDialog/deleteDialog.component';
import { Ingredient }                   from 'src/app/models/Recipe.model';
import { ComponentsService }            from 'src/app/services/database/components.servise';
import { Component as ComponentModel }  from '../../models/Component.model';
import { element } from 'protractor';

interface RecipesListItem{
    name: string;
    cost: number;
    selfCost: string;
    profit: string; // "+2.3g | +14%" "-0.4g | -5%"
}

@Component({
    selector: "recipes-list",
    templateUrl: "./recipesList.component.html",
    styleUrls: ['./recipesList.component.css'],
    providers: [ LogService ]
})
export class RecipesListComponent{
    recipesService: RecipesService;
    componentsService: ComponentsService;
    columnsToDisplay : string[] = ['name', 'cost', 'self_cost', 'profit', 'actions'];

    recipes: MatTableDataSource<RecipesListItem>;

    @ViewChild(MatPaginator) pagonator: MatPaginator;

    constructor(
        fireStorage: AngularFirestore, 
        log: LogService,
        public auth: AuthService,
        public dialog: MatDialog)
    {
        let storageProvider = new FirestoreDbProvider(fireStorage);
        this.recipesService = new RecipesService(storageProvider, log);
        this.componentsService = new ComponentsService(storageProvider, log);


    }   
    
    ngOnInit(): void {
        this.auth.user$.subscribe(user =>
        {
            this.componentsService.getComponentsList(user.uid).subscribe(components => 
            {
                this.recipesService.getRecipesList(user.uid).subscribe(recipes => {
                    console.log({recipes});
    
                    this.recipes = new MatTableDataSource<RecipesListItem>(recipes.map(x => {
                        return {
                            name: x.name,
                            cost: x.cost,
                            selfCost: this.getSelfCost(x.ingredients, components),
                            profit: "+2.3g | +14%"
                        }
                    }));
    
                    this.recipes.paginator = this.pagonator;
                });  
            })            
        });
    }

    openDeleteDialog(rowData){
        const dialogRef = this.dialog.open(DeleteDialogComponent);

        dialogRef.afterClosed().subscribe(result=> {
            if (result == "true"){
                this.deleteRecipe(rowData.name);
            }
        });
    }

    deleteRecipe(recipeName: string){
        this.auth.user$.subscribe(user =>
        {
            this.recipesService.deleteRecipe(recipeName, user.uid);
        })
    }

    getSelfCost(ingredientes: Ingredient[], allComponents: ComponentModel[]): string{
        let result: number = 0;

        var found = true;
        console.log({ingredientes});
        ingredientes.forEach(ingredient =>
        {            
            if (ingredient.name != "")
            {                
                var component = allComponents.find(x => x.name == ingredient.name);
                if (component == undefined){
                    found = false;
                    return;
                } else {
                    console.log(ingredient.count);
                    console.log(component.cost);
                    console.log(result);
                    result += ingredient.count * component.cost;
                    
                }   
            }       
        });

        if (found){
            console.log(result);
            return result.toString();
        } else {
            return "Can't calculate";
        }
    }
}