import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
        ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isAuthenticated()) {
            return of(true)
        } else {
            this.auth.logout()
            this.router.navigate(['/admin','login'], {
                queryParams: {
                    accessDenied: true
                }
            })
            return of(false)
        }
    }

    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): Observable<boolean> | Promise<boolean> | boolean {
           return this.canActivate(route,state)
        }

}