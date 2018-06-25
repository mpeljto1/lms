import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorage } from './token.storage'

@Injectable()
export class RoleGuard implements CanActivateChild {

    constructor(private router: Router, private token: TokenStorage) { }

    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        const userRole: string = this.token.getRole();  //  get the current user's roles
        const routeRole: string = route.data['roles'];   // get the role defined in router config
           
        if (userRole == routeRole) {
            return true;
        } else {
            window.alert("You don't have permission to view this page");
            this.router.navigate(['/login'])
            return false;
        }

    }
}