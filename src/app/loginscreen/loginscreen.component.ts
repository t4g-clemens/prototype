import { Component, OnInit, Input,Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css']
})
export class LoginscreenComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loginError: boolean = false;

  constructor(private auth: AuthenticationService, private router: Router ) { }

  ngOnInit(): void {
  }

  submit() {
    const { email, password } = this.form.value
    this.auth.login(email, password).then(() => {
      this.loginError = false;
      this.router.navigate(['/home/dashboard'])
    }).catch((error) => {
      console.log('login error')
      this.form.controls['password'].setErrors({'incorrect': true});
    });
  }

  fakeSubmit() {
    this.router.navigate(['/home/dashboard'])
  }

}
