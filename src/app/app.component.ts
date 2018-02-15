import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User;

  logout(): void {
    this.authService.logout();
  }
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.asObservable().subscribe(u => this.user = u);
  }
}
