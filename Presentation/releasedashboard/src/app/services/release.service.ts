import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Release } from '../models/Release';
import { Params } from '../params';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  //releases: Release[] = [];

  constructor(
    private params: Params,
    private baseService: BaseService
  ) {
    /*this.baseService.getServiceObservable(this.params.getEndpoint('rms-releases'))
      .subscribe(releases => this.releases = releases);*/
  }

  getReleases(app : string): Observable<Release[]> {
    const endPoint = app == 'rms' ? 'rms-releases' : app == 'rtt' ? 'rtt-releases' : 'ra-releases';
    return this.baseService.getServiceObservable(this.params.getEndpoint(endPoint));
  }
  
  removeRelease(rel : Release | string, app : string): Observable<any> {
    const endPoint = app == 'rms' ? 'rms-releases' : app == 'rtt' ? 'rtt-releases' : 'ra-releases';
    const id = typeof rel === 'string' ? rel : rel.id;
    return this.baseService.deleteServiceObservable(this.params.getEndpoint(endPoint)+id);
  }

  async addRelease(rel : Release, app : string): Promise<any> {
    const endPoint = app == 'rms' ? 'rms-releases' : app == 'rtt' ? 'rtt-releases' : 'ra-releases';
    return await this.baseService.postServiceObservable(this.params.getEndpoint(endPoint), JSON.stringify(rel)).toPromise();
  }

  async updateRelease(rel : Release, app : string): Promise<any> {
    const endPoint = app == 'rms' ? 'rms-releases' : app == 'rtt' ? 'rtt-releases' : 'ra-releases';
    return await this.baseService.putServiceObservable(this.params.getEndpoint(endPoint), JSON.stringify(rel)).toPromise();
  }

  getRelease(id: string, app : string): Observable<Release> {
    const endPoint = app == 'rms' ? 'rms-releases' : app == 'rtt' ? 'rtt-releases' : 'ra-releases';
    return this.baseService.getServiceObservable(this.params.getEndpoint(endPoint)+id);
  }
}
