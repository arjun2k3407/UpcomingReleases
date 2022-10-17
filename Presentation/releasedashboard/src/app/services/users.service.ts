import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { Params } from '../params';
import { BaseService } from './base.service';
import { ValidateService } from './validate.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public usersSource = new BehaviorSubject<User[]>([]);
  users = this.usersSource.asObservable();
  
  constructor(
    private flashMessage: FlashMessagesService,
    private params: Params,
    private baseService: BaseService
  ) {
    this.refreshUsers();
   }

  async getUsers(): Promise<any> {
    return await this.baseService.getServiceObservable(this.params.getEndpoint('users')).toPromise();
  }

  async addUser(user : User): Promise<any> {
    return await this.baseService.postServiceObservable(this.params.getEndpoint('users'), JSON.stringify(user)).toPromise();
  }

  async updateUser(user : User): Promise<any> {
    return await this.baseService.putServiceObservable(this.params.getEndpoint('users'), JSON.stringify(user)).toPromise();
  }

  async removeUser(user : User | string): Promise<any> {
    const id: string = typeof user === 'string' ? user : user.id;
    return this.baseService.deleteServiceObservable(this.params.getEndpoint('users')+id).toPromise();
  }

  async getUser(id: string): Promise<User> {
    return await this.baseService.getServiceObservable(this.params.getEndpoint('users')+id).toPromise();
  }

  async refreshUsers() : Promise<any> {
    await this.getUsers().then(usl => {
      this.usersSource.next(usl);
    }, () => {
      //show error
      this.flashMessage.show('Error getting User details', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    });
  }
}
