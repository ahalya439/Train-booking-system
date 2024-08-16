import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingsComponent } from './pages/bookings/bookings.component';

import { TrainsComponent } from './pages/trains/trains.component';
import { LoginComponent } from './pages/login/login.component';
 

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
   {
    path:'login',
    component:LoginComponent
   },
  {
    path:'home',
    component: HomeComponent
  },
 
   {
    path:'search/:fromStationId/:toStationId/:dateOfTravel',
    component:SearchComponent
   },
   {
    path:'bookings',
    component:BookingsComponent
   },

   {
    path:'trains',
    component:TrainsComponent
   }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
