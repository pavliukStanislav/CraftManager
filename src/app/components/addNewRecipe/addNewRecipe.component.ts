import  { Component } from '@angular/core';

import { LogService } from '../../services/logging/log.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RecipesService } from 'src/app/services/database/recipes.servise';
import { FirestoreDbProvider } from 'src/app/services/database/providers/firestore.dbprovider';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ComponentsService } from 'src/app/services/database/components.servise';

@Component({
    selector: "add-new-recipe",
    templateUrl: "./addNewRecipe.component.html",
    styleUrls: ['./addNewRecipe.component.css'],
    providers: [ LogService ]
})
export class AddNewRecipeComponent{
    addNewRecipeForm: FormGroup;

    recipesService: RecipesService;
    componentsService: ComponentsService;
    
    private currentUserId: string;

    options: string[];
    filteredOptions: Observable<string[]>;

    constructor(
            public auth: AuthService,
            private fb: FormBuilder,
            fireStorage: AngularFirestore,
            log: LogService,
            private snackBar: MatSnackBar){
        let storageProvider = new FirestoreDbProvider(fireStorage);
        this.recipesService = new RecipesService(storageProvider, log);
        this.componentsService = new ComponentsService(storageProvider, log);
    }   
    

    ngOnInit(): void {
        this.addNewRecipeForm = this.fb.group({
            name: new FormControl('', Validators.required),
            cost: new FormControl('', Validators.required),
            ingredianse_name_1: new FormControl('', Validators.required),
            ingredianse_count_1: new FormControl('', Validators.required),
            ingredianse_name_2: new FormControl('', Validators.required),
            ingredianse_count_2: new FormControl('', Validators.required),
            ingredianse_name_3: new FormControl(''),
            ingredianse_count_3: new FormControl(''),
            ingredianse_name_4: new FormControl(''),
            ingredianse_count_4: new FormControl(''),
            ingredianse_name_5: new FormControl(''),
            ingredianse_count_5: new FormControl(''),
            ingredianse_name_6: new FormControl(''),
            ingredianse_count_6: new FormControl('')
        });              

        this.auth.user$.subscribe(user =>
        {
            this.currentUserId = user.uid
            this.componentsService.getComponentsList(this.currentUserId).subscribe(components =>
                {
                    console.log(this.currentUserId)
                    console.log(components);
                    this.options = components.map(item => item.name);
                    this.filteredOptions = this.addNewRecipeForm.get('ingredianse_name_1').valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this.filter(value))
                    );
                }
            )
        });
    }   

    private filter(value: string): string[]{
        console.log(value);
        const filterValue = value.toLowerCase();
        return this.options.filter(options => options.toLowerCase().includes(filterValue));
    }

    createRecipe(){
        this.recipesService.addDataToCollection(
        {
            "name": this.addNewRecipeForm.get('name').value,
            "ingredients": [
                {
                    "name": this.addNewRecipeForm.get('ingredianse_name_1').value,
                    "count": this.addNewRecipeForm.get('ingredianse_count_1').value
                },
                {
                    "name": this.addNewRecipeForm.get('ingredianse_name_2').value,
                    "count": this.addNewRecipeForm.get('ingredianse_count_2').value
                },
                {
                    "name": this.addNewRecipeForm.get('ingredianse_name_3').value,
                    "count": this.addNewRecipeForm.get('ingredianse_count_3').value
                },
                {
                    "name": this.addNewRecipeForm.get('ingredianse_name_4').value,
                    "count": this.addNewRecipeForm.get('ingredianse_count_4').value
                },
                {
                    "name": this.addNewRecipeForm.get('ingredianse_name_5').value,
                    "count": this.addNewRecipeForm.get('ingredianse_count_5').value
                },
                {
                    "name": this.addNewRecipeForm.get('ingredianse_name_6').value,
                    "count": this.addNewRecipeForm.get('ingredianse_count_6').value
                }
            ],
            "cost": this.addNewRecipeForm.get('cost').value,
            "userId": this.currentUserId
        })

        this.snackBar.open('Recipe added!', 'Ok', {
            duration: 2000
        });
    }
}