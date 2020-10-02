import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ActivitiesComponent } from './activities/activities.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { ActivitiesCreateComponent } from './activities-create/activities-create.component';




@NgModule({
  declarations: [DashboardComponent, ActivitiesComponent, ActivitiesCreateComponent],
  exports: [ DashboardComponent, ActivitiesComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
