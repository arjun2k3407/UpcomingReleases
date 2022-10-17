import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  darkMode: boolean = false;

  constructor(
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

}
