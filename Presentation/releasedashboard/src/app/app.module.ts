import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddReleaseComponent } from './components/add-release/add-release.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReleaseDetailsComponent } from './components/release-details/release-details.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UpdateReleaseComponent } from './components/update-release/update-release.component';
import { UrlsComponent } from './components/urls/urls.component';
import { ValidateUserComponent } from './components/validate-user/validate-user.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuAddComponent } from './components/menu-add/menu-add.component';
import { MenuDetailsComponent } from './components/menu-details/menu-details.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { MenuUpdateComponent } from './components/menu-update/menu-update.component';
import { MenuItemAddComponent } from './components/menu-item-add/menu-item-add.component';
import { MenuItemUpdateComponent } from './components/menu-item-update/menu-item-update.component';
import { ToastrModule } from 'ngx-toastr';
import { RegressionComponent } from './components/regression/regression.component';
import { BackendComponent } from './components/backend/backend.component';
import { MiscellaneousComponent } from './components/miscellaneous/miscellaneous.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardLandingComponent } from './components/dashboard-landing/dashboard-landing.component';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    NotFoundComponent,
    SidebarComponent,
    ReleasesComponent,
    AddReleaseComponent,
    UpdateReleaseComponent,
    ReleaseDetailsComponent,
    UrlsComponent,
    ValidateUserComponent,
    MenuComponent,
    MenuAddComponent,
    MenuDetailsComponent,
    MenuSidebarComponent,
    MenuUpdateComponent,
    MenuItemAddComponent,
    MenuItemUpdateComponent,
    RegressionComponent,
    BackendComponent,
    MiscellaneousComponent,
    FooterComponent,
    DashboardLandingComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
