import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  protected hide: boolean = true;
  protected form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.minLength(6),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
      ]),
      dob: new FormControl('', [
        this.dateValidator,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.required]),
    });
  }

  protected togglePasswordHide(): void {
    this.hide = !this.hide;
  }

  // public signUp(): void {
  //   if (!this.email.errors && !this.name.errors && !this.password.errors) {
  //     this.loginService.setLoggedInStatus(true);
  //     this.router.navigate(['home']);
  //   }
  // }

  protected signUp(): void {
    const user = {
      name: `${this.form.get('firstName')?.value} ${this.form.get('lastName')?.value}`,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      dob: new Date(this.form.get('dob')?.value)
    };
    console.log(user);
  }

  protected dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control?.value ?? null) {
      const dateOfBirth = new Date(control.getRawValue().toString());
      const _date = `${(dateOfBirth.getMonth() > 8) ? (dateOfBirth.getMonth() + 1).toString() :
        ('0' + (dateOfBirth.getMonth() + 1).toString())}/${((dateOfBirth.getDate() > 9) ? dateOfBirth.getDate() :
        ('0' + dateOfBirth.getDate().toString()))}/${dateOfBirth.getFullYear().toString()}`;
      return (control.value !== undefined && _date[2] === '/' && _date[5] === '/') ?
        null : { 'dob': true };
    } else {
      return null;
    }
  }
}
