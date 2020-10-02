import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private url = 'http://localhost:3000';

  constructor( private authService: AuthService,
               private http: HttpClient ) { }

  getActivitiesUser(){
    const userId = this.authService.getIdUserOfToken();

    return this.http.get(`${ this.url }/activities?userId=${ userId }`);

  }

}
