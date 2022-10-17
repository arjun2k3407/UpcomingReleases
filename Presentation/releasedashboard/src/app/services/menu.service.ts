import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Menu } from '../models/Menu';
import { MenuItem } from '../models/MenuItem';
import { Params } from '../params';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menuSource = new BehaviorSubject<Menu[]>([]);
  menus = this.menuSource.asObservable();

  constructor(
    private flashMessage: FlashMessagesService,
    private params: Params,
    private baseService: BaseService
  ) {
    // this.baseService.getServiceObservable(this.params.getEndpoint('releases')).subscribe( men => this.menus = men);
    this.getMenus().then(res => {
      this.menuSource.next(res)
    }, () => {
      //show error
      this.flashMessage.show('Error getting Menu details', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    });
  }

  async getMenus(): Promise<any> {
    return await this.baseService.getServiceObservable(this.params.getEndpoint('menu')).toPromise();
  }

  async addMenu(menu : Menu): Promise<any> {
    return await this.baseService.postServiceObservable(this.params.getEndpoint('menu'), JSON.stringify(menu)).toPromise();
  }

  async addMenuItem(item : MenuItem): Promise<any> {
    return await this.baseService.postServiceObservable(this.params.getEndpoint('menuItem'), JSON.stringify(item)).toPromise();
  }

  async updateMenu(menu : Menu): Promise<any> {
    return await this.baseService.putServiceObservable(this.params.getEndpoint('menu'), JSON.stringify(menu)).toPromise();
  }

  async updateMenuItem(item : MenuItem): Promise<any> {
    return await this.baseService.putServiceObservable(this.params.getEndpoint('menuItem'), JSON.stringify(item)).toPromise();
  }

  async removeMenu(menu : Menu | number): Promise<any> {
    const id: number = typeof menu === 'number' ? menu : menu.id;
    return await this.baseService.deleteServiceObservable(this.params.getEndpoint('menu')+id).toPromise();
  }

  async removeMenuItem(menuHeader: string, id: number): Promise<any> {
    return await this.baseService.deleteServiceObservable(this.params.getEndpoint('menuItem')+menuHeader+'/'+id).toPromise();
  }
}
