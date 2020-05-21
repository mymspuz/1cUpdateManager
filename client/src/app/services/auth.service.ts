import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, EMPTY} from "rxjs";
import {RegUser, User} from "../auth/models/user.models";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token = null

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token
    localStorage.setItem('1cupdman', token)
  }

  getToken() {
    if (!this.token) {
      const isToken = localStorage.getItem('1cupdman')
      if (isToken) {
        this.setToken(isToken)
      }
    }
    return this.token
  }

  isAuthenticated(): boolean {
    this.getToken()
    return !!this.token
  }

  register(user: RegUser): Observable<RegUser> {
    return this.http.post<RegUser>('/api/auth/register', user)
  }

  saveUser(user: User): Observable<User> {
    return this.http.get<User>('/users' + user.uid)
  }

  updateOnlineStatus(uid: string, status: boolean): Observable<boolean> {
    const tempStatus = {
      uid,
      status
    }
    return this.http.post<boolean>('/user/status', tempStatus)
  }

  checkUserRole(uid: string): Observable<boolean> {
    return this.http.get<boolean>('/users' + uid)
  }

  updateProfile(displayName: string, photoUrl: string) {
    return this.http.patch('/users', {displayName, photoUrl})
  }

  getCurrentUser() {
    if (this.isAuthenticated()) {
      return this.http.get('/user', this.token)
    } else {
      return EMPTY
    }
  }

  login(email: string, password: string) {
    return this.http.post('/api/auth/login', {email, password})
  }

  socialLogin(authProvider: string) {
    let provider: any
    if (authProvider === 'google') {
      provider = 'google'
    }
    if (authProvider === 'facebook') {
      provider = 'facebook'
    }
    return this.http.post('/api/auth/login', provider)
  }

  logout(uid: string) {
    this.setToken(null)
    localStorage.clear()
    return this.http.post('/api/auth/logout', uid)
  }

  getAuthState() {
    if (this.isAuthenticated()) {
      return this.http.get('/api/user')
    } else {
      return EMPTY
    }
  }
}
