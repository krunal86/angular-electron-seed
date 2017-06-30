import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { HomeComponent } from './home/home.component';
import { ScreensComponent } from './screens/screens.component';
import { ScreenCaptureComponent } from './screen-capture/screen-capture.component';
import { ScreenCaptureService } from './screen-capture/screen-capture.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import {CircleComponent} from './elements/circle';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScreenCaptureComponent,
    ScreensComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule
  ],
  providers: [appRoutingProviders, ScreenCaptureService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
