import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule, 
  ReactiveFormsModule}                  from '@angular/forms';
import { NgModule }                     from '@angular/core';

import { AngularFireModule}             from '@angular/fire';
import { AngularFireAnalyticsModule }   from '@angular/fire/analytics';
import { AngularFirestoreModule }       from '@angular/fire/firestore';
import { AngularFireStorageModule }     from '@angular/fire/storage';

import { AppComponent }                 from './app.component';
import { HeaderComponent }              from './components/header/header.component';
import { HttpClientModule} from '@angular/common/http';

import { environment }                  from 'src/environments/environment';

import { MaterialModule }               from './components/material/material.module';
import { AppRoutingModule }             from './app-routing.module';
import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';

import { HomeComponent }                from './components/home/home.component';
import { RecipesListComponent }         from './components/recipesList/recipesList.component';
import { NotFountComponent }            from './components/not-found/not-found.component';
import { SignInComponent }              from './components/signIn/signin.component';
import { SignUpComponent }              from './components/signup/signup.component';
import { AddNewRecipeComponent }        from './components/dialogs/addNewRecipe/addNewRecipe.component';
import { ComponentsListComponent }      from './components/coponentsList/componentsList.component';
import { AddNewComponentComponent }     from './components/dialogs/addNewComponent/addNewComponent.component';
import { DeleteDialogComponent }        from './components/dialogs/removeDialog/deleteDialog.component';
import { EditComponentDialogComponent } from './components/dialogs/editComponent/editComponentDialog.component';
import { EditRecipeComponent }          from './components/dialogs/editRecipe/editRecipe.component';
import { ContactsComponent }            from './components/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFountComponent,
    RecipesListComponent,
    SignInComponent,
    SignUpComponent,
    AddNewRecipeComponent,
    ComponentsListComponent,
    AddNewComponentComponent,
    DeleteDialogComponent,
    EditComponentDialogComponent,
    EditRecipeComponent,
    ContactsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
