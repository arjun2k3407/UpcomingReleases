import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  darkMode: boolean = false;
  showSidebar: boolean = false;
  // showRelease: boolean = false;
  // showRegVal: boolean = false;
  // showBackend: boolean = false;

  constructor(
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    // this.showRelease = true;
    // this.showRegVal = false;
    // this.showBackend = false;
    this.validateService.userSource.subscribe(u => this.showSidebar = u.edit);
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

  // selectTab(tabName: string) {
  //   if (tabName === 'release') {
  //     this.showRelease = true;
  //     this.showRegVal = false;
  //     this.showBackend = false;
  //   } else if (tabName === 'regval') {
  //     this.showRelease = false;
  //     this.showRegVal = true;
  //     this.showBackend = false;
  //   } else if (tabName === 'backend') {
  //     this.showRelease = false;
  //     this.showRegVal = false;
  //     this.showBackend = true;
  //   }
  // }

}
