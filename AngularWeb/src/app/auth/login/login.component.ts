import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidationsService } from '../../services/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private validationsService: ValidationsService ) {
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
    console.log(this.form);
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach( control =>{
        control.markAllAsTouched();
      })
    }

    const userTemp = { ...this.form.value };
    this.clearSpacesFields( userTemp );

    this.authService.loginUser( userTemp )
                    .subscribe( resp => console.log(resp),
                                err => console.log(err));

  }

}
