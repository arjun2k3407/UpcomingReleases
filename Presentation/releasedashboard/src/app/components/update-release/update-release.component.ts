import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Release } from 'src/app/models/Release';
import { NotificationService } from 'src/app/services/notification.service';
import { ReleaseService } from 'src/app/services/release.service';
import { ValidateService } from 'src/app/services/validate.service';
import { Params } from '../../params';

@Component({
  selector: 'app-update-release',
  templateUrl: './update-release.component.html',
  styleUrls: ['./update-release.component.css']
})
export class UpdateReleaseComponent implements OnInit {
  darkMode: boolean = false;
  loaded: boolean = false;
  devInstances: string[];
  testInstances: string[];
  backEnds: string[];
  app: string = 'rms';
  redirect: string = '/rms/release/';
  release: Release = {
    id: null,
    citrixId: null,
    name: null,
    prodLike: false,
    backend: null,
    devDB: null,
    devInstance: null,
    testInstance: null,
    testDB: null,
    branch: {
      fo: null,
      ws: null,
      bo: null,
      rest: null,
      db: null,
      rtt_xapi: null,
      rtt_ios: null,
      ra_ios: null,
      ra_web: null,
      ra_api: null,
      ra_apns: null
    },
    date: null,
    comments: null
  };
  selectedDate: {
    year: number;
    month: number;
    day: number
  };
  @ViewChild('releaseForm') form: any;

  constructor(
    private releaseService: ReleaseService,
    private params: Params,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.route.snapshot.url.forEach(u => {
      if ('rms' === u.path) {
        return;
      } else if ('rtt' === u.path) {
        this.app = 'rtt';
        this.redirect = '/rtt/release/';
        return;
      } else if ('ra' === u.path) {
        this.app = 'ra';
        this.redirect = '/ra/release/';
        return;
      }
    });
    this.releaseService.getRelease(this.route.snapshot.params['id'], this.app).subscribe(release => {
      this.release = release;
      this.loaded = true;
      this.selectedDate = {
        year: Number(this.release.date.substring(0, 4)),
        month: Number(this.release.date.substring(5, 7)),
        day: Number(this.release.date.substring(8, 10))
      };
    });
    this.devInstances = this.params.getDevInstances(this.app);
    this.testInstances = this.params.getTestInstances(this.app);
    this.backEnds = this.params.getBackEnds(this.app);
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

  async onSubmit({ value, valid }: { value: Release, valid: boolean }) {
    if (valid) {
      if (this.selectedDate != null) {
        this.release.date = new Date(this.selectedDate.year.toString() + '/' + ((this.selectedDate.month < 10) ? ('0' + this.selectedDate.month.toString()) : this.selectedDate.month.toString()) + '/' + ((this.selectedDate.day < 10) ? ('0' + this.selectedDate.day.toString()) : this.selectedDate.day.toString()));
      }
      if (this.release.devInstance != null
        && this.release.devInstance !== ''
        && this.release.devInstance !== undefined) {
        if (this.app != 'rtt') {
          this.release.devDB = this.params.getDevInstance(this.release.devInstance);
        }
      } else {
        this.release.devInstance = null;
        this.release.devDB = null;
      }

      if (this.release.testInstance != null
        && this.release.testInstance !== ''
        && this.release.testInstance !== undefined) {
        if (this.app != 'rtt') {
          this.release.testDB = this.params.getTestInstance(this.release.testInstance);
        }
      } else {
        this.release.testInstance = null;
        this.release.testDB = null;
      }
      //call api
      await this.releaseService.updateRelease(this.release, this.app);
      //show message
      this.notifyService.showSuccess('Updated ' + this.release.name, 'Success!');
      //redirect to details
      this.router.navigate([this.redirect + this.release.id]);
    } else {
      //show error
      this.notifyService.showError('Please fill out the form correctly', 'Validation Failed');
    }
  }

}
