import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './user/homepage/sign/sign.component';
import { MainComponent } from './user/main/main.component';
import { ReservationPageComponent } from './user/reservation-page/reservation-page.component';
import { CalenderUserComponent } from './user/calender-user/calender-user.component';
import { ResFormComponent } from './user/res-form/res-form.component';
import { ProfileComponent } from './user/profile/profile.component';
import { TabResUComponent } from './user/tab-res-u/tab-res-u.component';
import { clientGuardGuard } from './guards/client-guard.guard';

const routes: Routes = [
  {path:"home",title:"Bernabeu",component:SignComponent},
  {path:"main",component:MainComponent,canActivate:[clientGuardGuard],children:[ 
    {path:"reservation",title:"Reserver",component:ReservationPageComponent},
    {path:"reservation/calendrier/:id",title:"calendrier",component:CalenderUserComponent},
    {path:"profil",title:"Profil",component:ProfileComponent},
    {path:"mesres",title:"Mes reservation",component:TabResUComponent},




    {path:"",redirectTo:"reservation",pathMatch:"full"}
  ]},
  {path:"",redirectTo:"main",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
