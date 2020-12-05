import { AfterViewInit, Component, ViewChild }         from '@angular/core';
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
import { MatSort }                      from "@angular/material/sort";
import { AddNewRecipeComponent }        from '../dialogs/addNewRecipe/addNewRecipe.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { EditRecipeComponent } from '../dialogs/editRecipe/editRecipe.component';

interface RecipesListItem{
    name: string;
    cost: number;
    selfCost: string;
    profit: string;
    costEffective: boolean;
    ingredients: Array<IngredientsInfo>;
}

interface IngredientsInfo{
    name: string;
    count: number;
    cost: number;
}

@Component({
    selector: "recipes-list",
    templateUrl: "./recipesList.component.html",
    styleUrls: ['./recipesList.component.css'],
    providers: [ LogService ],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ],
})
export class RecipesListComponent{
    recipesService: RecipesService;
    componentsService: ComponentsService;
    columnsToDisplay : string[] = ['collaped','name', 'cost', 'self_cost', 'profit', 'actions'];
    detailColumnsToDisplay : string [] = ['name', 'count', 'cost'];
    expandedElement: RecipesListItem | null;

    recipes: MatTableDataSource<RecipesListItem>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

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
                    this.recipes = new MatTableDataSource<RecipesListItem>(recipes.map(x => {
                        let selfCost = this.getSelfCost(x.ingredients, components);
                        let profitCount = x.cost - +selfCost;
                        let profitPersentage = (profitCount * 100 / x.cost).toFixed(2);

                        return {
                            name: x.name,
                            cost: x.cost,
                            selfCost: selfCost,
                            profit: profitCount > 0 ? `${profitCount} | ${profitPersentage}%` : selfCost,
                            costEffective: profitCount > 0 ? true: false,
                            ingredients: x.ingredients.map(ingr => {
                                return {
                                    name: ingr.name,
                                    count: ingr.count,
                                    cost: components.find(x => x.name == ingr.name)?.cost
                                }})
                        }
                    }));
                    
                    console.log(this.recipes);

                    this.recipes.paginator = this.paginator;                    
                    this.recipes.sort = this.sort;
                });  
            })            
        });
    }

    openAddNewRecipeDialog(){
        this.dialog.open(AddNewRecipeComponent);
    }

    openDeleteDialog(rowData){
        const dialogRef = this.dialog.open(DeleteDialogComponent);

        dialogRef.afterClosed().subscribe(result=> {
            if (result == "true"){
                this.deleteRecipe(rowData.name);
            }
        });
    }

    openEditDialog(rowData){
        const dialogRef = this.dialog.open(
            EditRecipeComponent,
            {
                data: {
                    name: rowData.name,
                    cost: rowData.cost,
                    ingredients: this.recipes.data.find(x => x.name == rowData.name).ingredients
            }});
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


        console.log(ingredientes);
        console.log(allComponents);

        ingredientes.forEach(ingredient =>
        {            
            if (ingredient.name != "")
            {           
                console.log(ingredient.name);
                console.log("!=");     
                var component = allComponents.find(x => x.name == ingredient.name);
                if (component == undefined){
                    found = false;
                    return;
                } else {
                    result += ingredient.count * component.cost;                    
                }   
            }       
        });

        if (found){
            return result.toString();
        } else {
            return "Can't calculate";
        }
    }
}