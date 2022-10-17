import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  darkMode: boolean = false;

  constructor(
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

}
