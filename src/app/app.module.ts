import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService } from './authentication.service';
import { TravelsService } from './travels.service';
import { TravelListComponent } from './travel-list/travel-list.component';
import { HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TravelListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, AuthGuard, TravelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
