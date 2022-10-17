import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from 'src/app/models/User';
import { NotificationService } from 'src/app/services/notification.service';
import { UsersService } from 'src/app/services/users.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loaded: boolean = false;
  darkMode: boolean = false;
  isAddEnabled: boolean = false;
  redirectHome: string = '/';
  users: User[];
  user: User;
  dummyUser: User = {
    id: null,
    ntid: null,
    fname: null,
    lname: null,
    edit: false,
    add: false
  };
  redirect: string = '/users';

  constructor(
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private notifyService: NotificationService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.user = this.copyUser(this.dummyUser);
    this.usersService.users.subscribe(us => this.users = us);
    this.validateService.userSource.subscribe(u => this.isAddEnabled = u.add);
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
    this.loaded = true;
  }

  async setUser(usr: User) {
    this.user = this.copyUser(usr);
  }

  async onSubmit({ value, valid }: { value: User, valid: boolean }) {
    if (valid) {
      this.user.ntid = this.user.ntid.toUpperCase();
      //call Add or Update api
      if(this.user.id == null) {
        this.user.id = await this.validateService.generateId();
        await this.usersService.addUser(this.user);
        //show message
        this.notifyService.showSuccess('User ' + this.user.ntid, ' added successfully!');
      } else {
        await this.usersService.updateUser(this.user);
        //show message
        this.notifyService.showSuccess('Updated details/permission for ' + this.user.ntid, 'Success!');
      }
      await this.usersService.refreshUsers();
      if (!await this.validateService.validateLoggedinUser(this.user.ntid)) {
        this.notifyService.showError('User Logged out as this user does not have access to Link Corner.', 'Logged Out');
        //redirect to home
        this.router.navigate([this.redirectHome]);
        return;
      }
      //reload
      await this.validateService.reloadPage();
      
    } else {
      //show error
      this.notifyService.showError('Please fill out the form correctly', 'Validation Failed');
    }
  }

  async onDelete(usr: User) {
    if (confirm('Are you sure you want to delete this release?')) {
      await this.usersService.removeUser(usr.id);
      //show message
      this.flashMessage.show('User '+ usr.fname + ' ' + usr.lname + ' deleted', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      await this.usersService.refreshUsers();
      if (!await this.validateService.validateLoggedinUser(usr.ntid)) {
        this.notifyService.showError('User Logged out as this user does not have access to Link Corner.', 'Logged Out');
        //redirect to home
        this.router.navigate([this.redirectHome]);
        return;
      }
      //reload
      await this.validateService.reloadPage();
    }
  }

  copyUser(usr: User) {
    let copyUser = {
      id: null,
      ntid: null,
      fname: null,
      lname: null,
      edit: false,
      add: false
    };
    copyUser.id = usr.id;
    copyUser.ntid = usr.ntid;
    copyUser.fname = usr.fname;
    copyUser.lname = usr.lname;
    copyUser.edit = usr.edit;
    copyUser.add = usr.add;
    return copyUser;
  }

}
