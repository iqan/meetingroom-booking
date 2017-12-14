import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componenets/navbar/navbar.component';
import { LoginComponent } from './componenets/login/login.component';
import { RegisterComponent } from './componenets/register/register.component';
import { HomeComponent } from './componenets/home/home.component';
import { ProfileComponent } from './componenets/profile/profile.component';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { FooterComponent } from './componenets/footer/footer.component';
import { LogoutComponent } from './componenets/logout/logout.component';

import { ValidationService } from './services/validation.service';
import { AuthService } from './services/auth.service';
import { BookingService } from './services/booking.service';
import { AuthGuard } from './guards/auth.guard';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { DropdownModule } from "ngx-dropdown";
import { BsModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

var appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    FooterComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    DropdownModule,
    BsModalModule
  ],
  providers: [
    ValidationService, AuthService, AuthGuard, BookingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
