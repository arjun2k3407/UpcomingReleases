import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ValidateService } from "./validate.service";

@Injectable()
export class AuthGuard implements CanActivate {
    isEditable: boolean = false;
    isAddUserEnabled: boolean = false;

    constructor(
        private router: Router,
        private validateService: ValidateService
    ) {
        this.validateService.userSource.subscribe(u => {
            this.isEditable = u.edit;
            this.isAddUserEnabled = u.add;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let addUser = false;
        let userUrl = false;
        route.url.forEach(u => {
            if ('users' === u.path) {
                userUrl = true;
                if (this.isAddUserEnabled) {
                    addUser = true;
                    return;
                }
                addUser = false;
                return;
            }
        });
        if (userUrl) {
            if (addUser) {
                return true;
            }
            this.router.navigate(['/']);
            return false;
        }
        if (this.isEditable)
            return true;
        else {
            this.router.navigate(['/']);
            return false;
        }
    }

}