import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AngularFireModule}           from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule }     from '@angular/fire/firestore';
import { AngularFireStorageModule }   from '@angular/fire/storage';

import { AppComponent }               from './app.component';
import { HeaderComponent }            from './components/header/header.component';

import { environment }                from 'src/environments/environment';

import { MaterialModule }             from './components/material/material.module';
import { AppRoutingModule }           from './app-routing.module';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';
import { Routes, RouterModule }       from '@angular/router';

import { HomeComponent }              from './components/home/home.component';
import { NotFountComponent }          from './components/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'contacts', component: NotFountComponent},
  { path: '**', component:  NotFountComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFountComponent
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
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
