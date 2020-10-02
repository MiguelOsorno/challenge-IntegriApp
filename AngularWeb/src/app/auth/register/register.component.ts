import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidationsService } from '../../services/validations.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
      username: ['', [Validators.required, this.validationsService.noEmpty ]],
      role: ['', [Validators.required, this.validationsService.noEmpty ]],
      email: ['', [Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      password: ['', [Validators.required, this.validationsService.noEmpty ]]
    });
  }

  save(){
    console.log(this.form);
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach( control =>{
        control.markAllAsTouched();
      })
    }

    const userTemp = { ...this.form.value };
    this.clearSpacesFields( userTemp );

    this.authService.createUser( userTemp )
                    .subscribe( async(resp) => {
                      console.log(resp);
                      const res = await Swal.fire({
                        icon: 'success',
                        text: 'Registro exitoso',
                        confirmButtonText: `Continuar`,
                      });
                      if( res.value ){
                        this.router.navigateByUrl('/dashboard');
                      }

                    }
                    , err => console.log(err.error) );

  }


}
