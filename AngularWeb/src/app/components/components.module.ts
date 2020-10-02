import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormActivitiesComponent } from './form-activities/form-activities.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormActivitiesComponent],
  exports: [FormActivitiesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
