import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  usersObject: any = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.authService.fetchUsersData().subscribe(
      (response: any) => {
        this.usersObject = response.data;
      },
      error => console.error(error)
    );
  }

  logout() {
    this.authService.logout();
  }

}
