import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Release } from 'src/app/models/Release';
import { ReleaseService } from 'src/app/services/release.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {
  darkMode: boolean = false;
  isEditable: boolean = false;
  releases: Release[];
  loaded: boolean = false;
  app: string = 'rms';
  redirectFinish : string ='/rms';
  redirect : string = '/rms/release/';
  redirectHome : string = '/';

  constructor(
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute,
    private rmsReleaseService: ReleaseService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.route.snapshot.url.forEach(u => {
      if('rms' === u.path) {
        return;
      } else if('rtt' === u.path) {
        this.app = 'rtt';
        this.redirect = '/rtt/release/';
        this.redirectFinish = '/rtt'
        return;
      } else if('ra' === u.path) {
        this.app = 'ra';
        this.redirect = '/ra/release/';
        this.redirectFinish = '/ra'
        return;
      }
    });
    this.rmsReleaseService.getReleases(this.app).subscribe(releases => {
      this.releases = releases;
      this.loaded = true;
    });
    this.validateService.userSource.subscribe(u => this.isEditable = u.edit);
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

  onDelete(rel: Release) {
    if (confirm('Are you sure you want to delete this release?')) {
      this.rmsReleaseService.removeRelease(rel.id, this.app).subscribe(() => {
        this.releases.forEach((l, i) => {
          if (l.id === rel.id) {
            this.releases.splice(i, 1);
          }
        });
        //show message
        this.flashMessage.show('Release deleted', {
          cssClass: 'alert-success',
          timeout: 4000
        });
        //redirect to dashboard
        this.router.navigate([this.redirectFinish]);
      });
    }
  }

}
