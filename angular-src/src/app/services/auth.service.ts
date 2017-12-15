import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  baseAddress = ''; //'http://localhost:3000';

  constructor(private http: Http) { }

  registerUser(user){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.baseAddress + '/users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.baseAddress + '/users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  getProfile(){
    var headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'bearer ' + this.authToken);

    return this.http.get(this.baseAddress + '/users/profile', { headers: headers })
      .map(res => res.json());
  }

  loadToken(){
    var token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  isLoggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
