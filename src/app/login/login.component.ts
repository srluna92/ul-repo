import { Component, OnInit } from '@angular/core';
import { FireService } from '../service/fire.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../service/form.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  u: string;
  p: string;
  user: User;
  loginControl: FormGroup;
  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router
  ) { }

  login() {
    this.authService.user.asObservable().subscribe(u => {
      if (!!u.email && this.router.url.includes('login')) {
        this.router.navigateByUrl(u.home ? u.home : 'search');
      }
    });
    this.authService.login(this.u, this.p);
  }
  newUser() {
    this.authService.newUser(this.u, this.p);
  }

  ngOnInit() {
    this.loginControl = this.formService.loginForm();
  }

}
