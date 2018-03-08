import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const webPattern = /^(?:http(?:s)?\:\/\/)?[a-zA-Z0-9]+(\.[a-zA-Z0-9\!\#\$\&\'\*\+\-\/\=\?\_\`\{\|\}\~]+)+$/;
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
      'name': ['', Validators.required],
      'company': ['', Validators.required],
      'type': ['', Validators.required],
      'weight': ['', Validators.required],
      'material': ['', Validators.required],
      'url': ['', [Validators.required, Validators.pattern(webPattern)]],
      'load': ['', Validators.required],
      'volume': ['', Validators.required],
      'fill': ['', Validators.required],
      'tempRange': ['', Validators.required],
      'rVal': ['', Validators.required]
    });
  }
  newItemSecondary(): FormGroup {
    return this.fb.group({

    });
  }
}
