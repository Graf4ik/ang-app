import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { User } from '../admin/interface';

@Injectable()
export class AuthService {

    private token = 'Token' + null

    constructor(private http: HttpClient) { }

    login(user: User): Observable<{ token: string }> {

        return this.http.post<{ token: string }>(`http://emphasoft-test-assignment.herokuapp.com/api-token-auth/`, user)
            .pipe(
                tap(
                    ({ token }) => {
                        localStorage.setItem('auth-token', token)
                        this.setToken(token)
                    }
                )
            )
    }

    logout() {
        this.setToken(null)
        localStorage.clear()
    }

    
    setToken(token: string) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

}