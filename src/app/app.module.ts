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
    LoginModule,
    SearchModule
  ],
  providers: [FireService, FormService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
