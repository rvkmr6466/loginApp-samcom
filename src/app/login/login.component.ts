import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public isSubmitted = false;
  public error: any = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value);
    this.authService.errorObs.subscribe(
      data => {
        this.error = data;
        this.hideError();
      },
      error => {
        this.error = 'something went wrong';
        this.hideError();
      }
    )
  }

  hideError() {
    setTimeout(() => {
      this.error = '';
    }, 2000)
  }


}
