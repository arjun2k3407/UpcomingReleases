import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.css']
})
export class ValidateUserComponent implements OnInit {
  darkMode: boolean = false;
  adid: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

  async onSubmit({ valid }: { value: string, valid: boolean }) {
    if (valid) {
      this.adid = this.adid.toUpperCase();
      if (await this.validateService.validateUser(this.adid)) {
        //show message
        this.notifyService.showSuccess('Now you have access to modify the Link Corner website.', 'Congratulation!');
        this.flashMessage.show(this.adid + ' validated successfully!', {
          cssClass: 'alert-success',
          timeout: 4000
        });
        //redirect to dashboard
        this.router.navigate(['/']);
      } else {
        //show message
        this.notifyService.showInfo('For Admin Access please contact RMS-Dev-RelLeads@sprint.com', 'Note:');
        this.flashMessage.show(this.adid + ' does not have update access!', {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.adid = '';
      }
    } else {
      //show error
      this.flashMessage.show('Please enter the NTID', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
  }
}
