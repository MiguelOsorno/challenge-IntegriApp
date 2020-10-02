import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities = [];

  constructor( private activitiesService: ActivitiesService,
               private router: Router ) { }

  ngOnInit(): void {
    this.getActivitiesUser();
  }


  getActivitiesUser(){
    this.activitiesService.getActivitiesUser()
                          .subscribe( (resp: any) => {
                            console.log(resp);
                            this.activities =  resp;
                          }, err => {
                            console.log(err);
                          });
  }

  changeToFormCreate(){
    this.router.navigateByUrl('dashboard/activities-create');
  }

}
