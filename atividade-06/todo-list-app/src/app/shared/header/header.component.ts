import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  render: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.menu.subscribe(show => this.render = show);
  }

  logout(): void {
    this.loginService.logout();
  }

}
