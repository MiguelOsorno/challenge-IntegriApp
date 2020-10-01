import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }


  noEmpty( control: FormControl ): {[s: string]: boolean } {

    if ( control.value.trim() === '' ){
      return {
        isEmpty: true
      };
    }

    return null;

  }

}
