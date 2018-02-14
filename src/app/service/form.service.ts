import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormService {

  fb = new FormBuilder();
  constructor() { }

  loginForm(): FormGroup {
    return this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }
  newItemForm(): FormGroup  {
    return this.fb.group({
      'company': ['', Validators.required],
      'type': ['', Validators.required]
    });
  }
}
