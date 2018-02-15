import { Component, OnInit } from '@angular/core';
import { FireService } from '../service/fire.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../service/form.service';
import { AuthService } from '../service/auth.service';

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
    private authService: AuthService,
    private formService: FormService
  ) { }

  login() {
    this.authService.login(this.u, this.p);
  }
  newUser() {
    this.authService.newUser(this.u, this.p);
  }

  ngOnInit() {
    this.loginControl = this.formService.loginForm();
  }

}
