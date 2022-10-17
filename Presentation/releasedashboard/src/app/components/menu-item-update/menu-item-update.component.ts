import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/Menu';
import { MenuItem } from 'src/app/models/MenuItem';
import { MenuService } from 'src/app/services/menu.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-menu-item-update',
  templateUrl: './menu-item-update.component.html',
  styleUrls: ['./menu-item-update.component.css']
})
export class MenuItemUpdateComponent implements OnInit {
  darkMode: boolean = false;
  loaded: boolean = false;
  id: number = 0;
  menuId: number = 0;
  menus: Menu[] = [];
  items: MenuItem[] = [];
  menu: Menu;
  parentMenu: string;
  item: MenuItem = {
    id: 0,
    type: '',
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
  prevId: number = 0;
  moveItem: boolean= false;
  showSamePosition: boolean= true;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.prevId = this.route.snapshot.params['id'];
    this.menuId = this.route.snapshot.params['menuid'];
    this.menuService.menus.subscribe(menus => {
      this.menus = menus;
      for (const men of menus) {
        if (men.id == this.menuId) {
          this.menu = men;
          this.items = men.items;
          for (const it of men.items) {
            if (it.id == this.id) {
              this.item.id = it.id;
              this.item.type = it.type;
              this.item.name = it.name;
              this.item.link = it.link;
              this.item.parentMenu = it.parentMenu;
              this.parentMenu = it.parentMenu;
              this.loaded = true;
              break;
            }
          }
          break;
        }
      }
    });
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

  onMoveMenuToggle() {    
    if(!this.moveItem) {
      this.item.parentMenu = this.menu.header;
      for (const men of this.menus) {
        if (men.header == this.item.parentMenu) {
          this.items = men.items;
        }
      }
      this.prevId = this.id;
      this.position = 's';
      this.showSamePosition = true;
    }
  }

  onParentMenuChange() {
    for (const men of this.menus) {
      if (men.header == this.item.parentMenu) {
        this.items = men.items;
      }
    }
    if (this.parentMenu == this.item.parentMenu) {
      this.prevId = this.id;
      this.showSamePosition = true;
      this.position = 's';
    } else {
      this.prevId = 1;
      this.showSamePosition = false;
      this.position = 'f';
    }
  }

  async onSubmit({ value, valid }: { value: MenuItem, valid: boolean }) {
    let deleteSuccess = false;
    if (valid) {
      if(this.item.type == 'divider') {
        this.item.name = null;
        this.item.link = null;
      }else if(this.item.type == 'header') {
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
      let name = this.item.name != null? this.item.name: 'DIVIDER';
      let parent = this.item.parentMenu;
      //call api
      if(this.moveItem && this.parentMenu != this.item.parentMenu) { // Move under different parent menu
        //delete from current Menu
        await this.menuService.removeMenuItem(this.parentMenu, this.id).then(() => {
          //this.menuService.menuSource.next(menus);
          //show message
          deleteSuccess = true;
          },
          err => {
            this.notifyService.showError('Removing item from previous menu fails: '+err, 'Remove item Failed');
          }
        );
        //add to new menu
        if(deleteSuccess) {
          await this.menuService.addMenuItem(this.item).then(menus => {
            //show message
            this.notifyService.showSuccess(name + ' item details updated and moved to '+parent, 'Updated Successfully!');
            this.menuService.menuSource.next(menus);
            //redirect to Menu
            this.router.navigate(['/menu']);
          },
            err => {
              this.notifyService.showError('Reason: ' + err, 'Update Failed');
            }
          );
        }
      }else {// Moving item with in the same menu
        await this.menuService.updateMenuItem(this.item).then(menus => {
          this.menuService.menuSource.next(menus);
          //show message
          this.notifyService.showSuccess(name + ' item details updated', 'Updated Successfully!');
          //redirect to Menu
          this.router.navigate(['/menu']);
        },
          err => {
            this.notifyService.showError('Reason: ' + err, 'Update Failed');
          }
        );
      }
    } else {
      this.notifyService.showError('Please fill out the form correctly', 'Validation Failed');
    }
  }

}
