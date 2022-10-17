import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-menu-update',
  templateUrl: './menu-update.component.html',
  styleUrls: ['./menu-update.component.css']
})
export class MenuUpdateComponent implements OnInit {
  darkMode: boolean = false;
  loaded: boolean = false;
  id: number = 0;
  menus: Menu[] = [];
  menu: Menu = {
    id: 0,
    header: '',
    items: [],
    position: null,
    prevId: 0
  };
  positionFirst = 'f';
  positionAfter = 'a';
  positionSame = 's'
  position = 's';
  prevId: number = 0;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.prevId = this.id;
    this.menuService.menus.subscribe(menus => {
      this.menus = menus;
      for (const men of menus) {
        if (men.id == this.id) {
          this.menu.id = men.id;
          this.menu.header = men.header;
          this.menu.items = men.items;
          this.loaded = true;
          break;
        }
      }
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
      //call api
      await this.menuService.updateMenu(this.menu).then(menus => {
        this.menuService.menuSource.next(menus);
        //show message
        this.notifyService.showSuccess(this.menu.header + ' details updated', 'Updated Successfully!');
        //redirect to Menu
        this.router.navigate(['/menu']);
      },
        err => {
          this.notifyService.showError('Reason: ' + err, 'Update Failed');
        }
      );
    } else {
      this.notifyService.showError('Please fill out the form correctly', 'Validation Failed');
    }
  }
}
