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

const routes: Routes = [
    //{ path: 'login', component: LoginComponent },
    //{ path: 'add-user', component: AddUserComponent },
    //{ path: 'edit-user', component: EditUserComponent },
    //{ path: 'list-user', component: ListUserComponent },
    {
        path: 'admin-panel', component: AdminPanelComponent,
        children: [
            { path: '', component: AdminDashboardComponent},
            {path: 'list-user', component: ListUserComponent},    
            { path: 'add-user', component: AddUserComponent },
            { path: 'edit-user', component: EditUserComponent },
            { path: 'add-book', component: AddBookComponent },
            { path: 'edit-book', component: EditBookComponent },
            { path: 'list-book', component: ListBookComponent },
            { path: 'list-rent', component: ListRentComponent }
        ]
    },
    //{ path: 'add-book', component: AddBookComponent },
    //{ path: 'edit-book', component: EditBookComponent },
    //{ path: 'list-book', component: ListBookComponent },
    //{ path: 'list-rent', component: ListRentComponent },
    { path: '', component: LoginComponent } // vjerovatno defaultna koja će se pozvati
];

export const routing = RouterModule.forRoot(routes);