import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup
  message: string
  aSub: Subscription

  constructor(
    private auth:AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params)=> {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста, введите данные'
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заного'
      }
    })

    this.form = new FormGroup({
      username: new FormControl('', 
      [Validators.required,
        Validators.minLength(6)
      ]),
      password: new FormControl(null,[
        Validators.required,
        Validators.minLength(6)
      ])
    })

    this.route.queryParamMap.subscribe((params: Params) => {
      if (params['accessDenied']) {
        // Для начала авторизуйтесь в системе
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
  

  submit() {
    if(this.form.valid) {
      const FormData = {...this.form.value}
    }

    const user: User = {
     username:this.form.value.username,
     password:this.form.value.password 
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'users'])
    })
  }
}
