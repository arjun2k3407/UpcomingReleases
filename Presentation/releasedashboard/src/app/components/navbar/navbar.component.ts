import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  darkMode: boolean = false;
  loggedIn: boolean = true;
  editAccess: boolean = false;
  addAccess: boolean = false;
  name: string = 'Guest';
  menus: Menu[] = [];

  constructor(
    private validateService: ValidateService,
    private menuService: MenuService,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.validateService.userSource.subscribe(u => {
      this.loggedIn = (u.id != null);
      this.editAccess = u.edit;
      this.addAccess = u.add;
      this.name = 'Guest';
      if(u.fname != null) {
        this.name = u.fname;
      }
      if(u.lname != null) {
        this.name += ' ' +u.lname;
      }
    });
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
    this.menuService.menus.subscribe(menu => {
      this.menus = menu;
    });
  }

  logOut() {
    this.validateService.logOut();
    this.notifyService.showWarning('Now you have only read access', 'Logged Out!')
  }

  toggleTheme(theme: string) {
    this.validateService.toggleTheme(theme);
  }
}
