import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { UsersComponent } from '../admin/users/users.component';
import { AuthGuard } from './classes/auth.guard';
import { SearchPipe } from '../search.pipe';
import { OrderByPipe } from '../orderBy.pipe';

@NgModule({
    declarations:[
        AdminLayoutComponent,
        LoginComponent,
        UsersComponent,
        SearchPipe,
        OrderByPipe
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
        {
             path:'', component:AdminLayoutComponent, children: [
            {path: '', redirectTo: '/admin/login', pathMatch:'full'},
            {path:'login', component: LoginComponent},
            {path: 'users', component:UsersComponent, canActivate:[AuthGuard]}
            ]
        }
        ])
    ],
    exports:[
        RouterModule
    ]
})
export class AdminModule {

}