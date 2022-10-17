import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Release } from 'src/app/models/Release';
import { ReleaseService } from 'src/app/services/release.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-release-details',
  templateUrl: './release-details.component.html',
  styleUrls: ['./release-details.component.css']
})
export class ReleaseDetailsComponent implements OnInit {
  darkMode: boolean = false;
  isEditable: boolean = false;
  release: Release;
  loaded: boolean = false;
  app: string = 'rms';
  redirectFinish: string = '/rms';
  redirect: string = '/rms/release/';
  copyRedirect: string = '/rms/release/add/';

  constructor(
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private releaseService: ReleaseService,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.route.snapshot.url.forEach(u => {
      if ('rms' === u.path) {
        return;
      } else if ('rtt' === u.path) {
        this.app = 'rtt';
        this.redirect = '/rtt/release/';
        this.redirectFinish = '/rtt';
        this.copyRedirect = '/rtt/release/add/';
        return;
      } else if ('ra' === u.path) {
        this.app = 'ra';
        this.redirect = '/ra/release/';
        this.redirectFinish = '/ra';
        this.copyRedirect = '/ra/release/add/';
        return;
      }
    });
    this.copyRedirect = this.copyRedirect + this.route.snapshot.params['id'];
    this.validateService.userSource.subscribe(u => this.isEditable = u.edit);
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
    this.releaseService.getRelease(this.route.snapshot.params['id'], this.app).subscribe(release => {
      this.release = release;
      this.loaded = true;
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this release?')) {
      this.releaseService.removeRelease(this.release.id, this.app).subscribe(() => {
        //show message
        this.flashMessage.show(this.release.name + ' deleted', {
          cssClass: 'alert-success',
          timeout: 4000
        });
        //redirect to dashboard
        this.router.navigate([this.redirectFinish]);
      });
    }
  }
}
