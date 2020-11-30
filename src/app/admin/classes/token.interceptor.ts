import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router
        ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            req = req.clone({
                withCredentials: true,
                setHeaders: {
                    Authorization: 'token ' + this.auth.getToken(),
                    "X-CSRFToken": "tcTPQJvtb7kAIpqmTZL9hyY22lRkGBU1iysaV3dhi34yidEXmgUujy73NnIlLWJI"
                }
            })
        }
        return next.handle(req)
        .pipe(
            tap(()=> {
                console.log('Intercept', req)
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('[Interceptor Error]', error)
                if (error.status === 401) {
                    this.auth.logout()
                    this.router.navigate(['/admin','login']), {
                        queryParams: {
                            authFailed: true
                        }
                    }
                }
                return throwError(error)
            })
        )
    }
}