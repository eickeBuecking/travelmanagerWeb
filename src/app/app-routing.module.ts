import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {TravelListComponent} from './travel-list/travel-list.component';
const routes : Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'travels', component: TravelListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
