import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {User} from "./auth/models/user.models";
import {AppState} from "./reducers";
import {Store} from "@ngrx/store";

import * as fromAuth from './auth/store/auth.actions'
import {getIsAdmin, getIsLoading, getIsLoggedIn, getUser} from "./auth/store/auth.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.select(getUser)
    this.isLoggedIn$ = null//this.store.select(getIsLoggedIn)
    this.isLoading$ = null//this.store.select(getIsLoading)
    this.isAdmin$ = null//this.store.select(getIsAdmin)
  }

  onLogout(user: User) {
    this.store.dispatch(new fromAuth.LogoutRequested( { user } ))
  }
}
