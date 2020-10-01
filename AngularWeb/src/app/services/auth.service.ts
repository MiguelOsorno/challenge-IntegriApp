import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  loginUser( user: Iuser){

    return this.http.post( `${ this.url }/login`, user );

  }


  createUser( user: Iuser ){

    return this.http.post(`${ this.url }/signup`, user);

  }

}
