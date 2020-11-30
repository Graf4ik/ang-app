import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(users, value: Array<any>) {
        return users.filter(user => {
            return user.username.includes(value)
        })
    }
}