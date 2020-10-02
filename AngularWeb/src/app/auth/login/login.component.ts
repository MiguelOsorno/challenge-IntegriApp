import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidationsService } from '../../services/validations.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private validationsService: ValidationsService,
               private router: Router ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  clearSpacesFields( form ){
    const Keys = Object.keys(form);

    Keys.forEach( key => {
      if ( typeof form[key] === 'string' ){
        form[key] = form[key].trim();
      }
    });

  }


  errorField( field: string ){
    if(this.form.get(field)){
      return this.form.get(field).invalid && this.form.get(field).touched;
    }
  }

  createForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, this.validationsService.noEmpty ]]
    });
  }

  save(){
    // console.log(this.form);
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach( control =>{
        control.markAllAsTouched();
      })
    }

    Swal.fire({  allowOutsideClick: false,
                 icon: 'info',
                  text: 'Espera por Favor..'});
    Swal.showLoading();

    const userTemp = { ...this.form.value };
    this.clearSpacesFields( userTemp );

    this.authService.loginUser( userTemp )
                    .subscribe( (resp: any) => {
                                console.log(resp);
                                Swal.close();
                                this.router.navigateByUrl('/dashboard');
                                },
                                (err) => {
                                  console.log(err);
                                  Swal.fire({
                                    icon: 'error',
                                    text: 'Error al autenticar',
                                  });
                                });

  }

}
