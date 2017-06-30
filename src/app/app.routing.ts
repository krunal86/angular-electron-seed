import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenCaptureComponent } from './screen-capture/screen-capture.component';
import { HomeComponent } from './home/home.component';
import { ScreensComponent } from './screens/screens.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
const appRoutes: Routes = [

  { path: 'Screens', component: ScreensComponent },
  { path: 'editScreens', component: ScreenCaptureComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: SignupComponent, pathMatch: 'full' },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
