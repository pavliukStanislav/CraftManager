import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFountComponent } from './components/not-found/not-found.component';
import { SignInComponent } from './components/signIn/signin.component';
import { SignUpComponent } from './components/signup/signup.component';
import { RecipesListComponent } from './components/recipesList/recipesList.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo }       from '@angular/fire/auth-guard';
import { ComponentsListComponent } from './components/coponentsList/componentsList.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'recipes', component: RecipesListComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  { path: 'components', component: ComponentsListComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  { path: '**', component:  NotFountComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
