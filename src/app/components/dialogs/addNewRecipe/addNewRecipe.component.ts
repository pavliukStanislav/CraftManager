import { Component } from '@angular/core';

import { LogService } from '../../../services/logging/log.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RecipesService } from 'src/app/services/database/recipes.servise';
import { FirestoreDbProvider } from 'src/app/services/database/providers/firestore.dbprovider';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ComponentsService } from 'src/app/services/database/components.servise';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: "add-new-recipe",
    templateUrl: "./addNewRecipe.component.html",
    styleUrls: ['./addNewRecipe.component.css'],
    providers: [ LogService ]
})
export class AddNewRecipeComponent{
    addNewRecipeForm: any;
    
    recipesService: RecipesService;
    componentsService: ComponentsService;
    
    private currentUserId: string;

    options: string[];
    filteredOptions: Observable<string[]>;

    constructor(
            public auth: AuthService,
            fireStorage: AngularFirestore,
            log: LogService,
            private snackBar: MatSnackBar,
            public dialogRef: MatDialogRef<AddNewRecipeComponent>){
        let storageProvider = new FirestoreDbProvider(fireStorage);
        this.recipesService = new RecipesService(storageProvider, log);
        this.componentsService = new ComponentsService(storageProvider, log);
    }   
    
    addNewIngr(){
        this.addNewRecipeForm.get('ingredients').push(
            new FormGroup({
                ingredientName: new FormControl('', Validators.required),
                ingredientCount: new FormControl('', Validators.required)
            })
        );
        
        const index = this.addNewRecipeForm.get('ingredients').length-1;

        this.auth.user$.subscribe(user =>
        {
            this.currentUserId = user.uid
            this.componentsService.getComponentsList(this.currentUserId).subscribe(components =>
            {
                this.options = components.map(item => item.name);
                this.filteredOptions = this.addNewRecipeForm.get('ingredients').at(index).get('ingredientName').valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this.filter(value.toString()))
                    );
            })
        });
    }

    removeIngr(index){
        if (this.addNewRecipeForm.get('ingredients').length > 1){
            this.addNewRecipeForm.get('ingredients').removeAt(index);
        }
    }

    ngOnInit(): void {
        this.addNewRecipeForm = new FormGroup({
            name: new FormControl('', Validators.required),
            cost: new FormControl('', Validators.required),
            ingredients: new FormArray([])
        });

        //default values;
        this.addNewIngr();
    }   

    private filter(value: string): string[]{
        const filterValue = value.toLowerCase();
        return this.options.filter(options => options.toLowerCase().includes(filterValue));
    }

    createRecipe(){
        //this.addNewRecipeForm.value.items;

        this.addNewRecipeForm.value.userId = this.currentUserId;
        console.log(this.addNewRecipeForm.value);

        this.recipesService.addDataToCollection(this.addNewRecipeForm.value);        

        
        this.dialogRef.close("true");
        this.snackBar.open('Recipe added!', 'Ok', {
            duration: 2000
        });
    }
}