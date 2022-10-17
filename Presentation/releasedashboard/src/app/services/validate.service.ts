import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  //private users: string[] = environment.userList;
  private userDummy: User = {
    id: null,
    ntid: null,
    fname: null,
    lname: null,
    edit: false,
    add: false
  };
  public userSource = new BehaviorSubject<User>(this.userDummy);
  user = this.userSource.asObservable();
  private validateSource = new BehaviorSubject<boolean>(false);
  validated = this.validateSource.asObservable();
  private addValidateSource = new BehaviorSubject<boolean>(false);
  addValidated = this.addValidateSource.asObservable();
  private darkModeSource = new BehaviorSubject<boolean>(false);
  darkMode = this.darkModeSource.asObservable();

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {
    if (localStorage.getItem('user') != null
      || localStorage.getItem('user') != undefined) {
      this.userSource.next(JSON.parse(localStorage.getItem('user')));
    }
    if ((localStorage.getItem('theme') != null
      || localStorage.getItem('theme') != undefined)
      && localStorage.getItem('theme') == 'moon') {
      this.darkModeSource.next(true);
    } else {
      window.localStorage.setItem('theme', 'sun');
      this.darkModeSource.next(false);
    }
  }

  async validateUser(ntid: string): Promise<boolean> {
    let status: boolean;
    let loggedinUser: User = this.userDummy;
    this.usersService.users.subscribe(usl => {
      for (const us of usl) {
        if (us.ntid == ntid) {
          status = true;
          loggedinUser = us;
          break;
        }
      }
    });
    await this.updateLoginUserDetails(loggedinUser);
    return status;
  }

  async updateLoginUserDetails(us: User) {
    window.localStorage.setItem('user', JSON.stringify(us));
    this.validateSource.next(us.edit);
    this.addValidateSource.next(us.add);
    this.userSource.next(us);
  }

  async validateLoggedinUser(ntid: string): Promise<boolean> {
    if (localStorage.getItem('user') != null
      || localStorage.getItem('user') != undefined) {
      let localUser = JSON.parse(localStorage.getItem('user'));
      return (ntid == localUser.ntid) ? await this.validateUser(localUser.ntid) : true;
    }
    return true;
  }

  async logOut(): Promise<void> {
    await this.updateLoginUserDetails(this.userDummy);
    await this.reloadPage();
  } 

  async reloadPage(): Promise<void> {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  async generateId(): Promise<string> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  toggleTheme(theme: string): boolean {
    window.localStorage.setItem('theme', theme);
    if (localStorage.getItem('theme') == 'moon') {
      this.darkModeSource.next(true);
    } else {
      this.darkModeSource.next(false);
    }
    return true;
  }
}
