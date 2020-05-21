import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";

import * as fromAuth from '../auth/store/auth.reducer'
import {AuthState} from '../auth/store/auth.state'

export interface AppState {
  auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
}

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state, action): AppState {
    if (action.type === '[Auth] LOGOUT completed') {
      state = undefined
    }
    return reducer(state, action)
  }
}

export const metaReducers: MetaReducer<AppState>[] = [clearState]
