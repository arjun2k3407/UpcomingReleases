import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.css']
})
export class DashboardLandingComponent implements OnInit {

  darkMode: boolean = false;

  constructor(
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

}
