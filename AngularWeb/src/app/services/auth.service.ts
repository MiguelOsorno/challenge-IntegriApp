import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/user.model';

import jwt_decode from "jwt-decode";

import moment from 'moment';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  loginUser(user: Iuser) {

    return this.http.post(`${this.url}/login`, user)
      .pipe(
        map((resp: any) => {
          this.saveToken(resp.accessToken);
          return resp;
        })
      );

  }


  createUser(user: Iuser) {

    return this.http.post(`${this.url}/signup`, user)
      .pipe(
        map((resp: any) => {
          this.saveToken(resp.accessToken);
          return resp;
        })
      );

  }


  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  readToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return undefined;
    }
  }






  isAuthenticated() {
    const token: any = this.readToken();

    if (!token) {
      return false;
    }

    const decoded = jwt_decode(token);

    const expire = new Date(decoded.exp).valueOf();

    // console.log(expire);

    const dateCurrent = moment().unix();

    // console.log(dateCurrent);

    return dateCurrent < expire;

  }


}
