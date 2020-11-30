import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users = []
  searchStr = '';

  order: string = 'users.id';
  reverse: boolean = false;

  pSub: Subscription

   constructor(
    private usersService: UsersService) {}

  ngOnInit(): void {
    this.pSub = this.usersService.getUsers().subscribe(users => {
    this.users = users
  })
}

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}
