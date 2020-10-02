import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from '../../services/validations.service';
import { ActivitiesService } from '../../services/activities.service';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-activities',
  templateUrl: './form-activities.component.html',
  styleUrls: ['./form-activities.component.css']
})
export class FormActivitiesComponent implements OnInit {

  form: FormGroup

  categories = ['Deporte', 'Salud', 'Entretenimiento'];

  constructor( private fb: FormBuilder,
               private validationsService: ValidationsService,
               private activitiesService: ActivitiesService,
               private authService: AuthService,
               private router: Router
               ) { }

  ngOnInit(): void {
    this.createForm();
  }


  errorField( field: string ){
    if (this.form.get(field)){
      return this.form.get(field).invalid && this.form.get(field).touched;
    }
  }

  createForm(){
    this.form = this.fb.group({
      description: ['', [Validators.required, this.validationsService.noEmpty ]],
      category: ['', [Validators.required, this.validationsService.noEmpty ]]
    });
  }

  save(){

    console.log(this.form);

    if (this.form.invalid){
      return Object.values(this.form.controls).forEach( control =>{
        control.markAllAsTouched();
      });
    }

    Swal.fire({  allowOutsideClick: false,
        icon: 'info',
        text: 'Espera por Favor..'});
    Swal.showLoading();

    console.log('se mando a guardar');

    const userId = this.authService.getIdUserOfToken();

    const fecha = new Date();
    const activityTemp = { ...this.form.value, fecha, userId };

    this.activitiesService.createActivity( activityTemp )
                          .subscribe( async (resp) => {
                            console.log(resp);
                            const res = await Swal.fire({
                              icon: 'success',
                              text: 'Registro exitoso',
                              confirmButtonText: `Continuar`,
                            });
                            if( res.value ){
                              this.router.navigateByUrl('dashboard/activities');
                            }
                          }, err => console.log(err) );

  }



}
