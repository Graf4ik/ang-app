import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { UserItem } from '../admin/interface';

@Injectable()

export class UsersService {

    constructor(private http: HttpClient) {
    }
    
    usersUrl = 'http://emphasoft-test-assignment.herokuapp.com/api/v1/users/';

    getUsers(): Observable<any> {
        return this.http.get(this.usersUrl)
        .pipe(map((response: {[key: string]: any}) => {
            return Object
              .keys(response)
              .map(key => ({
                ...response[key]
              }))
          }))  
    }
}