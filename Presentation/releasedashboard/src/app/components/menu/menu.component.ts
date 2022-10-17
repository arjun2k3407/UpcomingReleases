import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isEditable: boolean = false;

  constructor(
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.validateService.userSource.subscribe(u => this.isEditable = u.edit);
  }

}
