import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { LoginModule } from './login/login.module';
import { SearchModule } from './search/search.module';
import { AddModule } from './add/add.module';
import { AboutModule } from './about/about.module';
import { PackModule } from './pack/pack.module';
import { SettingsModule } from './settings/settings.module';
import { FireService, FormService, AuthService, IdService, GuardService } from './service/service-index';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { MultifilterPipe } from './pipe/multifilter.pipe';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    LoginModule,
    SearchModule,
    AddModule,
    AboutModule,
    PackModule,
    SettingsModule,
    AngularFirestoreModule,
  ],
  providers: [FireService, FormService, AuthService, IdService, GuardService, MultifilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
