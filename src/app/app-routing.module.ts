import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFountComponent } from './components/not-found/not-found.component';
import { SignInComponent } from './components/signIn/signin.component';
import { SignUpComponent } from './components/signup/signup.component';
import { RecipesListComponent } from './components/recipesList/recipesList.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo }       from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'contacts', component: NotFountComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'recipes', component: RecipesListComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin} },
  { path: '**', component:  NotFountComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
