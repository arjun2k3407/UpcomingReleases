import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/Menu';
import { MenuItem } from 'src/app/models/MenuItem';
import { MenuService } from 'src/app/services/menu.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})
export class MenuAddComponent implements OnInit {
  darkMode: boolean = false;
  loaded: boolean = false;
  menus: Menu[] = [];
  menu: Menu = {
    id: 0,
    header: '',
    items: [],
    position: null,
    prevId: 0
  };
  item: MenuItem = {
    id: 1,
    type: 'item',
    name: null,
    link: null,
    parentMenu: '',
    position: null,
    prevId: 0
  };
  positionFirst = 'f';
  positionAfter = 'a';
  positionEnd = 's'
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
      this.loaded = true;
    });
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

  async onSubmit({ value, valid }: { value: Menu, valid: boolean }) {
    if (valid) {
      if (this.position === 'f') { // first position
        this.menu.position = 'f';
        this.menu.prevId = 0;
      } else if (this.position === 's') { // same position
        this.menu.position = null;
        this.menu.prevId = 0;
      } else { // after
        this.menu.position = 'm';
        this.menu.prevId = this.prevId;
      }

      if(this.item.type == 'divider') {
        this.item.name = null;
        this.item.link = null;
      }else if(this.item.type == 'header') {
        this.item.link = null;
      }

      this.item.parentMenu = this.menu.header;
      this.menu.items = [];
      this.menu.items.push(this.item);

      //call api
      await this.menuService.addMenu(this.menu).then(menus => {
        this.menuService.menuSource.next(menus);
        //show message
        this.notifyService.showSuccess(this.menu.header + ' added.', 'Success!');
        //redirect to Menu
        this.router.navigate(['/menu']);
      },
        err => {
          this.notifyService.showError('Reason: ' + err, 'Menu Add Failed');
        }
      );
      
    } else {
      this.notifyService.showError('Please fill out the form correctly', 'Validation Failed');
    }
  }
}
