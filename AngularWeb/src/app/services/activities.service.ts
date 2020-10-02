import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IActivity } from '../interfaces/activity.model';

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


  createActivity( activity: IActivity ){

    const token = this.authService.readToken();

    console.log(activity);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`,
      'Content-Type': 'application/json'
    })

    return this.http.post(`${ this.url }/664/activities`, activity , { headers });
  }

}
