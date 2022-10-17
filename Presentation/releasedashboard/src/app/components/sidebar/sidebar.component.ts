import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  app : string = 'rms';
  redirect : string = '/rms/release/add';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.snapshot.url.forEach(u => {
      if('rms' === u.path) {
        return;
      } else if('rtt' === u.path) {
        this.app = 'rtt';
        this.redirect = '/rtt/release/add';
        return;
      } else if('ra' === u.path) {
        this.app = 'ra';
        this.redirect = '/ra/release/add';
        return;
      }
    });
  }

}
