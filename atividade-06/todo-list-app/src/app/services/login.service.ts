import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private __isAuthenticated: boolean = false;

  private userEmail: string = '1';
  private userPassword: string = '1';
  
  private showOnMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  get isAuthenticated(): boolean {
    return this.__isAuthenticated;
  }

  get menu(): EventEmitter<boolean> {
    return this.showOnMenu;
  }

  login(email: string, password: string) {
    this.__isAuthenticated = email === this.userEmail && password === this.userPassword;
    this.showOnMenu.emit(this.__isAuthenticated);

    if (this.__isAuthenticated) {
      this.router.navigate(['tasks']);
    }
  }

  logout() {
    this.__isAuthenticated = false;
    this.showOnMenu.emit(this.__isAuthenticated);
    this.router.navigate(['login']);
  }

}
