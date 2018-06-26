import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ListBookComponent } from './list-book/list-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ListRentComponent } from './list-rent/list-rent.component';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListRentComponent } from './user-list-rent/user-list-rent.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RoleGuard } from './service/role.guard';

const routes: Routes = [
    {
        path: 'admin-panel', component: AdminPanelComponent,
        canActivateChild: [RoleGuard],
        data: { roles: ['admin'] },
        children: [
            {
                path: '', component: AdminDashboardComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['admin'] },
            },
            {
                path: 'list-user', component: ListUserComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['admin'] },
            },
            {
                path: 'add-user', component: AddUserComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['admin'] },
            },
            {
                path: 'edit-user', component: EditUserComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['admin'] },
            },
            {
                path: 'add-book', component: AddBookComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['admin'] },
            },
            {
                path: 'edit-book', component: EditBookComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['admin'] },
            },
            {
                path: 'list-book', component: ListBookComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['admin'] },
            },
            {
                path: 'list-rent', component: ListRentComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['admin'] },
            },
            {
                path: 'list-payment', component: ListPaymentComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['admin'] },
            }
        ]
    },
    {
        path: 'user-panel', component: UserPanelComponent,
        canActivateChild: [RoleGuard],
        data: { roles: ['user'] },
        children: [
            {
                path: '', component: UserDashboardComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['user'] },
            },
            {
                path: 'list-rent', component: UserListRentComponent,
                canActivateChild: [RoleGuard],
                data: { roles: ['user'] },
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: '', component: LoginComponent }
];

export const routing = RouterModule.forRoot(routes);