import { Component, OnInit } from '@angular/core';
import { FireService } from '../service/fire.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  u: string;
  p: string;
  loginControl: FormGroup;
  constructor(
    private fireService: FireService,
    private formService: FormService
  ) { }

  login() {
    this.fireService.login(this.u, this.p);
  }
  newUser() {
    this.fireService.newUser(this.u, this.p);
  }

  ngOnInit() {
    this.loginControl = this.formService.loginForm();
  }

}
