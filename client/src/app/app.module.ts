import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MDBBootstrapModule, ModalModule} from 'angular-bootstrap-md';
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreModule} from "@ngrx/store";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { HeaderComponent } from './core/header/header.component';
import {metaReducers, reducers} from "./reducers";
import {AuthModule} from "./auth/auth.module";
import {environment} from "../environments/environment";
import {CoreModule} from "./core/core.module";
import {TokenInterceptor} from "./interceptors/token.interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    //SharedModule,
    ModalModule.forRoot(),
    //AdminModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      },
      metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([])
  ],
  providers: [{provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor}],
  bootstrap: [AppComponent]
})
export class AppModule { }
