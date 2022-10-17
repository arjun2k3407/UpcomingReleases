import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Backend } from "./models/Backend";
import * as _ from 'lodash';
import { DB } from "./models/DB";

@Injectable({
    providedIn: 'root'
  })
export class Params {
    private baseRestUrl = environment.baseRestUrl;
    private urlDetails = environment.urlDetails;
    private serverDetails = environment.serverDetails;
    private params_endpoint: Backend[];
    private backends: string[] = [ 'ITE1', 'ITE2', 'ITE3' ];
    private devInstances: string[] = [ 'DEV1', 'DEV2', 'DEV3', 'DEV5', 'DEV7', 'DEV8', 'DEV10' ];
    private testInstances: string[] = [ 'ITE1', 'ITE2', 'ITE3' ];
    private rtt_backends: string[] = [ 'QLAB01', 'QLAB02', 'QLAB03' ];
    private rtt_devInstances: string[] = [ 'DEV01', 'DEV02' ];
    private rtt_testInstances: string[] = [ 'QLAB01', 'QLAB02', 'QLAB03' ];
    private ra_backends: string[] = [  ];
    private ra_devInstances: string[] = [ 'DEV01' ];
    private ra_testInstances: string[] = [ 'QLAB01' ];

    constructor() {
        this.params_endpoint = [
            {
                key: 'rms-releases',
                value: this.baseRestUrl + 'LinkCorner/releaseservices/rms/releases/'
            },
            {
                key: 'rtt-releases',
                value: this.baseRestUrl + 'LinkCorner/releaseservices/rtt/releases/'
            },
            {
                key: 'ra-releases',
                value: this.baseRestUrl + 'LinkCorner/releaseservices/ra/releases/'
            },
            {
                key: 'menu',
                value: this.baseRestUrl + 'LinkCorner/menuservices/menu/'
            },
            {
                key: 'menuItem',
                value: this.baseRestUrl + 'LinkCorner/menuservices/menuitem/'
            },
            {
                key: 'users',
                value: this.baseRestUrl + 'LinkCorner/userservices/users/'
            }
        ];
    }

    ngOnInit() { }

    getUrlDetails() {
        return this.urlDetails;
    }

    getServerDetails() {
        return this.serverDetails;
    }

    getEndpoint(value) {
        if (this.params_endpoint.find(a => a.key == value) === undefined) {

            return null;
        } else {
            return this.params_endpoint.find(a => a.key == value).value;
        }
    }

    getBackEnds(app : string): string[] {
        return app == 'rtt' ? this.rtt_backends : app == 'ra'? this.ra_backends : this.backends;
    }

    getDevInstances(app : string): string[] {
        return app == 'rtt' ? this.rtt_devInstances : app == 'ra'? this.ra_devInstances : this.devInstances;
    }

    getTestInstances(app : string): string[] {
        return app == 'rtt' ? this.rtt_testInstances : app == 'ra'? this.ra_testInstances : this.testInstances;
    }

    getDevInstance(instance: string): DB {
        return environment.devDB[instance];
    }

    getTestInstance(instance: string): DB {
        return environment.testDB[instance];
    }
}