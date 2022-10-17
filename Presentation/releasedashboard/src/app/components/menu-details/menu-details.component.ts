import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/Menu';
import { MenuItem } from 'src/app/models/MenuItem';
import { MenuService } from 'src/app/services/menu.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {
  darkMode: boolean = false;
  collapseState: boolean[] = [];
  isEditable: boolean = false;
  loaded: boolean = false;
  menus: Menu[] = [];

  constructor(
    private validateService: ValidateService,
    private menuService: MenuService,
    private notifyService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateService.userSource.subscribe(u => this.isEditable = u.edit);
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
    this.menuService.menus.subscribe(m => {
      this.menus = m;
      this.menus.forEach(m => {
        if (this.loaded) {
          this.collapseState.push(false);
        } else {
          this.collapseState.push(true);
        }
        this.loaded = true;
      });
    });
  }

  async onDelete(menu: Menu) {
    if (confirm('Are you sure you want to delete this menu?')) {
      await this.menuService.removeMenu(menu.id).then(menus => {
        this.menuService.menuSource.next(menus);
        //show message
        this.notifyService.showSuccess(menu.header + ' deleted', 'Success');
      },
        err => {
          this.notifyService.showError('Reason: '+err, 'Delete Failed');
        });
    }
  }

  async onDeleteItem(item: MenuItem) {
    if (confirm('Are you sure you want to delete this menu item?')) {
      await this.menuService.removeMenuItem(item.parentMenu, item.id).then(menus => {
        this.menuService.menuSource.next(menus);
        //show message
        this.notifyService.showSuccess((item.name != null? item.name: 'DIVIDER') + ' deleted', 'Success');
        },
        err => {
          this.notifyService.showError('Reason: '+err, 'Delete Failed');
        }
      );
    }
  }
}
