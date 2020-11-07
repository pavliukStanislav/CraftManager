import  { Component } from '@angular/core';
import { FirestoreDbProvider} from '../../services/database/providers/firestore.dbprovider';
import { RecipesService } from '../../services/database/recipes.servise';
import { LogService } from '../../services/logging/log.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
    selector: "recipes-list",
    templateUrl: "./recipesList.component.html",
    styleUrls: ['./recipesList.component.css'],
    providers: [ LogService ]
})
export class RecipesListComponent{
    panelOpenState = false;

    recipesService: RecipesService;
    recipesList: Array<string>;

    constructor(fireStorage: AngularFirestore, log: LogService){
        let storageProvider = new FirestoreDbProvider(fireStorage);
        this.recipesService = new RecipesService(storageProvider, log);
    }   
    
    ngOnInit(): void {
        //this.photoUrl = this.imagesService.getMainPhoto();
        this.recipesList = this.recipesService.getRecipesList();
    }
}