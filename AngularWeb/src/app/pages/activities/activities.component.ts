import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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

  async deleteActivity(activity){
    console.log(activity);

    const borralo: any = await Swal.fire({
      title: 'Seguro que desea borrarlo?',
      text: "No podras revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    });

    console.log(borralo);

    if (!borralo.value) {
      return;
    }

    this.activitiesService.deleteActivity(activity.id)
                          .subscribe( resp => {
                            console.log(resp);
                            this.getActivitiesUser();
                          }, err => {
                            console.log(err);
                          });
  }

  changeToFormCreate(){
    this.router.navigateByUrl('dashboard/activities-create');
  }


}
