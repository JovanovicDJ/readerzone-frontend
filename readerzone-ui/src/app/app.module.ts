import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptor/TokenInterceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Paths } from 'src/environments/paths';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,    
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access-token');
        },
        allowedDomains: [environment.baseUrl],
        disallowedRoutes: [`${environment.baseUrl}/${Paths.Login}`]
      }
    }),
    MatSelectCountryModule.forRoot('en')
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
