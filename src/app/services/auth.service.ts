import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersList = [
    { userName: "samcom@gmail.com", password: "123" },
    { userName: "samcomtechnobrains@gmail.com", password: "sam123@2" }
  ];
  error = new BehaviorSubject('');
  errorObs = this.error.asObservable();
  userAuthenticate: boolean = false;

  constructor(
    private _http: HttpClient,
    private router: Router,
  ) { }

  login(loginData: any) {
    console.log(loginData);
    for (let user of this.usersList) {
      if (loginData.email == user['userName'] && loginData.password == user['password']) {
        this.router.navigateByUrl('/users');
        this.userAuthenticate = true;
        sessionStorage.setItem('username', loginData.email)
        sessionStorage.setItem('password', user['password'])
      }
      else {
        this.error.next("user doesn't exist!")
      }
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  fetchUsersData() {
    let url = 'https://reqres.in/api/users';
    return this._http.get(url);
  }

  isAuthenticated() {
    if (!this.userAuthenticate) {
      let userName = sessionStorage.getItem("username");
      let password = sessionStorage.getItem("password");
      for (let user of this.usersList) {
        if (userName == user['userName'] && password == user['password']) {
          this.router.navigateByUrl('/users');
          this.userAuthenticate = true;
        }
        else {
          this.error.next("user doesn't exist!");
        }
      }
    }
  }
}
