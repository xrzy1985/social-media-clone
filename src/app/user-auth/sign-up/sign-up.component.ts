import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute , Router, ParamMap} from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  protected hide: boolean = true;

  constructor(private loginService: LoginService, private router: Router) {}

  protected email = new FormControl('', [Validators.required, Validators.email]);
  protected name = new FormControl('', [Validators.required]);
  protected password = new FormControl('', [Validators.required]);
  protected title: string = '';

  protected togglePasswordHide(): void {
    this.hide = !this.hide;
  }

  public signUp(): void {
    if (!this.email.errors && !this.name.errors && !this.password.errors) {
      this.loginService.setLoggedInStatus(true);
      this.router.navigate(['home']);
    }
  }
}