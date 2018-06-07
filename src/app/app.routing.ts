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

const routes: Routes = [
    {
        path: 'admin-panel', component: AdminPanelComponent,
        children: [
            { path: '', component: AdminDashboardComponent},
            { path: 'list-user', component: ListUserComponent},    
            { path: 'add-user', component: AddUserComponent },
            { path: 'edit-user', component: EditUserComponent },
            { path: 'add-book', component: AddBookComponent },
            { path: 'edit-book', component: EditBookComponent },
            { path: 'list-book', component: ListBookComponent },
            { path: 'list-rent', component: ListRentComponent },
            { path: 'list-payment', component: ListPaymentComponent}
        ]
    },
    {
        path: 'user-panel', component: UserPanelComponent,
        children: [
            { path: '', component: UserDashboardComponent},
            { path: 'list-rent', component: UserListRentComponent}
        ]
    },
    { path: 'login', component: LoginComponent },
    { path:'register', component: RegisterComponent },
    { path: '', component: LoginComponent } // vjerovatno defaultna koja će se pozvati
];

export const routing = RouterModule.forRoot(routes);