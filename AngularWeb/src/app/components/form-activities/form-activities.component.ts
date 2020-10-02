import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from '../../services/validations.service';

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
  }

}
