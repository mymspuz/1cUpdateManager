import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {
  ButtonsModule,
  CardsModule,
  IconsModule,
  InputsModule,
  InputUtilitiesModule,
  WavesModule
} from "angular-bootstrap-md";
import {AuthEffects} from "./store/auth.effects";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import * as fromAuth from './store/auth.reducer'
import {RegisterComponent} from "./components/register/register.component";
import {AuthService} from "../services/auth.service";



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    InputUtilitiesModule,
    ButtonsModule,
    CardsModule,
    WavesModule,
    RouterModule,
    IconsModule,
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [RegisterComponent],
  providers: [AuthService]
})
export class AuthModule { }
