import { Component, Inject } from '@angular/core';
import { LogService } from '../../../services/logging/log.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from 'src/app/services/database/recipes.servise';
import { Observable } from 'rxjs';
import { map, filter, startWith } from 'rxjs/operators';
import { ComponentsService } from 'src/app/services/database/components.servise';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Ingredient } from 'src/app/models/Recipe.model';
import { FirestoreDbProvider } from 'src/app/services/database/providers/firestore.dbprovider';
import { AngularFirestore } from '@angular/fire/firestore';

export interface EditRecipeData{
    name: string,
    cost: number,
    ingredients: Array<Ingredient>
}

@Component({
    selector: "edit-recipe",
    templateUrl: "./editRecipe.component.html",
    styleUrls: ['./editRecipe.component.css'],
    providers: [ LogService ]
})
export class EditRecipeComponent{
    editRecipeForm: any;
    
    recipesService: RecipesService;
    componentsService: ComponentsService;
    
    private currentUserId: string;

    options: string[];
    filteredOptions: Observable<string[]>;

    constructor(
        public auth: AuthService,
        public dialogRef: MatDialogRef<EditRecipeComponent>,
        log: LogService,
        fireStorage: AngularFirestore,
        @Inject(MAT_DIALOG_DATA) public data: EditRecipeData) {
            let storageProvider = new FirestoreDbProvider(fireStorage);
            this.recipesService = new RecipesService(storageProvider, log);
            this.editRecipeForm = new FormGroup({
                name: new FormControl('', Validators.required),
                cost: new FormControl('', Validators.required),
                ingredients: new FormArray([])
            });
            
            data.ingredients.forEach( x =>
                {
                    this.editRecipeForm.get('ingredients').push(
                        new FormGroup({
                            name: new FormControl('', Validators.required),
                            count: new FormControl('', Validators.required)
                        })
                    );
                }
            )
    }
    
    addNewIngr(){
        this.data.ingredients.push({
            name: "",
            count: 0
        });

        this.editRecipeForm.get('ingredients').push(
            new FormGroup({
                name: new FormControl('', Validators.required),
                count: new FormControl('', Validators.required)
            })
        );
        
        const index = this.editRecipeForm.get('ingredients').length-1;

        this.auth.user$.subscribe(user =>
        {
            this.currentUserId = user.uid
            this.componentsService.getComponentsList(this.currentUserId).subscribe(components =>
            {
                this.options = components.map(item => item.name);
                this.filteredOptions = this.editRecipeForm.get('ingredients').at(index).get('name').valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this.filter(value.toString()))
                    ); 
            })
        });
    }

    private filter(value: string): string[]{
        const filterValue = value.toLowerCase();
        return this.options.filter(options => options.toLowerCase().includes(filterValue));
    }

    removeIngr(index){
        if (this.editRecipeForm.get('ingredients').length > 1){
            this.editRecipeForm.get('ingredients').removeAt(index);
            this.data.ingredients.splice(index, 1);
        }
    }

    editRecipe(){
        this.editRecipeForm.value.userId = this.currentUserId;
        console.log(this.editRecipeForm.value);

        this.recipesService.updateRecipe(this.editRecipeForm.value);
    }

    close(){
        this.dialogRef.close();
    }
}