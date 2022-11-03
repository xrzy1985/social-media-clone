import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  protected hide: boolean = true;
  protected email = new FormControl('', [Validators.required, Validators.email]);
  protected password = new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

  protected togglePasswordHide(): void {
    this.hide = !this.hide;
  }

  protected disableLoginButton(): boolean {
    return !this.password.invalid && !this.email.invalid;
  }

  public login(): void {
    // replace with auth
    if (
      // environment.auth.email === this.email.value &&
      // environment.auth.password === this.loginService.encrypted(this.password.value ?? '') &&
      !this.email.errors &&
      !this.password.errors
    ) {
      this.loginService.setLoggedInStatus(true);
      this.router.navigate(['home']);
    }
  }
}
