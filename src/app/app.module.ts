import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppsettingsComponent } from './components/appsettings/appsettings.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AppcontentComponent } from './components/appcontent/appcontent.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserService } from './service/user.service';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { Globals } from './model/Globals';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { BookService } from './service/book.service';
import { ListRentComponent } from './list-rent/list-rent.component';
import { RentService } from './service/rent.service';
import { DataTablesModule } from 'angular-datatables';
import { AuthService } from './service/auth.service';
import { TokenStorage } from './service/token.storage';
import { Interceptor } from './service/app.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    AppsettingsComponent,
    AddUserComponent,
    AppcontentComponent,
    ListUserComponent,
    EditUserComponent,
    LoginComponent,
    AdminPanelComponent,
    AddBookComponent,
    EditBookComponent,
    ListBookComponent,
    ListRentComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    UserService, 
    BookService, 
    RentService, 
    AuthService, 
    TokenStorage, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
