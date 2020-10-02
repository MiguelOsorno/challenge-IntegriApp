import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ActivitiesComponent } from './activities/activities.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [DashboardComponent, ActivitiesComponent],
  exports: [ DashboardComponent, ActivitiesComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
