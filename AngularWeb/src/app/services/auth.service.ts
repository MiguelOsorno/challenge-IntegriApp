import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/user.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = 'http://localhost:3000';

  userToken: string;

  constructor( private http: HttpClient ) { }

  loginUser( user: Iuser){

    return this.http.post( `${ this.url }/login`, user )
                    .pipe(
                      map( (resp: any) => {
                        this.saveToken( resp.accessToken );
                        return resp;
                      })
                    );

  }


  createUser( user: Iuser ){

    return this.http.post(`${ this.url }/signup`, user)
                    .pipe(
                      map( (resp: any) => {
                        this.saveToken( resp.accessToken );
                        return resp;
                      })
                    );

  }


  private saveToken( token: string ){
    this.userToken = token;
    localStorage.setItem('token', token);
  }

  readToken(){
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;

  }

}
