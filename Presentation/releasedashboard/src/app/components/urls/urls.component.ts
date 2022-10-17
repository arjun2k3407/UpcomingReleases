import { Component, OnInit } from '@angular/core';
import { Server } from 'src/app/models/Server';
import { Url } from 'src/app/models/Url';
import { ValidateService } from 'src/app/services/validate.service';
import { Params } from '../../params';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css']
})
export class UrlsComponent implements OnInit {
  darkMode: boolean = false;
  servers: Server[];
  urlDetails: Url;
  selectedDB: Server;
  prefix: string = 'http://';

  constructor(
    private params: Params,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.servers = this.params.getServerDetails();
    this.urlDetails = this.params.getUrlDetails();
    this.validateService.darkMode.subscribe(d => this.darkMode = d);
  }

  // ngAfterContentChecked() {
  //   (this.selectedDB);
  // }
}
