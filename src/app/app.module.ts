import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';
import { FireService } from './service/fire.service';
import { FormService } from './service/form.service';
import { LoginModule } from './login/login.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { SearchModule } from './search/search.module';
import { AddModule } from './add/add.module';
import { AuthService } from './service/auth.service';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { AboutModule } from './about/about.module';
import { PackModule } from './pack/pack.module';
import { SettingsModule } from './settings/settings.module';
import { IdService } from './service/id.service';


@NgModule({
  declarations: [
    AppComponent
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
    SettingsModule
  ],
  providers: [FireService, FormService, AngularFirestore, AuthService, IdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
