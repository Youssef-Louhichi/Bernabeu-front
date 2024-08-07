import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignComponent } from './user/homepage/sign/sign.component';
import { MainComponent } from './user/main/main.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { ReservationPageComponent } from './user/reservation-page/reservation-page.component';
import { CalenderUserComponent } from './user/calender-user/calender-user.component';
import { ResFormComponent } from './user/res-form/res-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './user/profile/profile.component';
import { TabResUComponent } from './user/tab-res-u/tab-res-u.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFeedbackComponent } from './user/add-feedback/add-feedback.component';
import { AnnulerReservationComponent } from './user/annuler-reservation/annuler-reservation.component';
import {HttpClientModule} from "@angular/common/http";
import { AlertComponent } from './user/alert/alert.component';
import { SpinnerComponent } from './composant/spinner/spinner.component';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    MainComponent,
    NavbarComponent,
    ReservationPageComponent,
    CalenderUserComponent,
    ResFormComponent,
    ProfileComponent,
    TabResUComponent,
    AddFeedbackComponent,
    AnnulerReservationComponent,
    AlertComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
