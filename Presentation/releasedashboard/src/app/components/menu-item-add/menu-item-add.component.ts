import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/Menu';
import { MenuItem } from 'src/app/models/MenuItem';
import { MenuService } from 'src/app/services/menu.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-menu-item-add',
  templateUrl: './menu-item-add.component.html',
  styleUrls: ['./menu-item-add.component.css']
})
export class MenuItemAddComponent implements OnInit {
  darkMode: boolean = false;
  loaded: boolean = false;
  menus: Menu[] = [];
  items: MenuItem[] = [];
  menu: Menu;
  parentMenu: string;
  item: MenuItem = {
    id: 0,
    type: 'item',
    name: null,
    link: null,
    parentMenu: '',
    position: null,
    prevId: 0
  };
  positionFirst = 'f';
  positionAfter = 'a';
  positionSame = 's'
  position = 's';
  prevId: number = 1;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private notifyService: NotificationService,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.menuService.menus.subscribe(menus => {
      this.menus = menus;
      if (menus.length > 0) {
        this.item.parentMenu = menus[0].header;
        this.items = menus[0].items;
      }
      this.loaded = true;
    });
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

  onParentMenuChange() {
    for (const men of this.menus) {
      if (men.header == this.item.parentMenu) {
        this.items = men.items;
        this.prevId = 1;
      }
    }
  }

  async onSubmit({ value, valid }: { value: MenuItem, valid: boolean }) {
    if (valid) {
      if (this.item.type == 'divider') {
        this.item.name = null;
        this.item.link = null;
      } else if (this.item.type == 'header') {
        this.item.link = null;
      }

      if (this.position === 'f') { // first position
        this.item.position = 'f';
        this.item.prevId = 0;
      } else if (this.position === 's') { // same position
        this.item.position = null;
        this.item.prevId = 0;
      } else { // after
        this.item.position = 'm';
        this.item.prevId = this.prevId;
      }
      let name = this.item.name != null ? this.item.name : 'DIVIDER';
      let parent = this.item.parentMenu;

      //call api
      await this.menuService.addMenuItem(this.item).then(menus => {
        //show message
        this.notifyService.showSuccess(name + ' item added to ' + parent, 'Success!');
        this.menuService.menuSource.next(menus);
        //redirect to Menu
        this.router.navigate(['/menu']);
      },
        err => {
          this.notifyService.showError('Add menu item failed: ' + err, 'Failed');
        }
      );
    } else {
      this.notifyService.showError('Please fill out the form correctly', 'Validation Failed');
    }
  }
}
