import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm?: FormGroup;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  onSubmit(): void {
    let email = this.loginForm?.controls['email'].value;
    let password = this.loginForm?.controls['password'].value;

    this.loginService.login(email, password);
  }

}
