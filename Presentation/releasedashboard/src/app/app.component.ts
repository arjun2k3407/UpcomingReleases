import { Component, OnInit } from '@angular/core';
import { ValidateService } from './services/validate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  darkMode: boolean = false;
  title = 'releasedashboard';

  constructor(
    private validateService: ValidateService
  ){}

  ngOnInit(): void {
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }
}
