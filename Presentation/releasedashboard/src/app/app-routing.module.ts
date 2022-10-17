import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddReleaseComponent } from './components/add-release/add-release.component';
import { BackendComponent } from './components/backend/backend.component';
import { DashboardLandingComponent } from './components/dashboard-landing/dashboard-landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuAddComponent } from './components/menu-add/menu-add.component';
import { MenuItemAddComponent } from './components/menu-item-add/menu-item-add.component';
import { MenuItemUpdateComponent } from './components/menu-item-update/menu-item-update.component';
import { MenuUpdateComponent } from './components/menu-update/menu-update.component';
import { MenuComponent } from './components/menu/menu.component';
import { MiscellaneousComponent } from './components/miscellaneous/miscellaneous.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegressionComponent } from './components/regression/regression.component';
import { ReleaseDetailsComponent } from './components/release-details/release-details.component';
import { UpdateReleaseComponent } from './components/update-release/update-release.component';
import { UrlsComponent } from './components/urls/urls.component';
import { UsersComponent } from './components/users/users.component';
import { ValidateUserComponent } from './components/validate-user/validate-user.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'LinkCorner',
    pathMatch: 'full'
  },
  {
    path: 'rms',
    redirectTo: 'LinkCorner/rms',
    pathMatch: 'full'
  },
  {
    path: 'rtt',
    redirectTo: 'LinkCorner/rtt',
    pathMatch: 'full'
  },
  {
    path: 'ra',
    redirectTo: 'LinkCorner/ra',
    pathMatch: 'full'
  },
  {
    path: 'rms/release/add',
    redirectTo: 'LinkCorner/rms/release/add',
    pathMatch: 'full'
  },
  {
    path: 'rtt/release/add',
    redirectTo: 'LinkCorner/rtt/release/add',
    pathMatch: 'full'
  },
  {
    path: 'ra/release/add',
    redirectTo: 'LinkCorner/ra/release/add',
    pathMatch: 'full'
  },
  {
    path: 'rms/release/add/:id',
    redirectTo: 'LinkCorner/rms/release/add/:id',
    pathMatch: 'full'
  },
  {
    path: 'rtt/release/add/:id',
    redirectTo: 'LinkCorner/rtt/release/add/:id',
    pathMatch: 'full'
  },
  {
    path: 'ra/release/add/:id',
    redirectTo: 'LinkCorner/ra/release/add/:id',
    pathMatch: 'full'
  },
  {
    path: 'rms/release/edit/:id',
    redirectTo: 'LinkCorner/rms/release/edit/:id',
    pathMatch: 'full'
  },
  {
    path: 'rtt/release/edit/:id',
    redirectTo: 'LinkCorner/rtt/release/edit/:id',
    pathMatch: 'full'
  },
  {
    path: 'ra/release/edit/:id',
    redirectTo: 'LinkCorner/ra/release/edit/:id',
    pathMatch: 'full'
  },
  {
    path: 'rms/release/:id',
    redirectTo: 'LinkCorner/rms/release/:id',
    pathMatch: 'full'
  },
  {
    path: 'rtt/release/:id',
    redirectTo: 'LinkCorner/rtt/release/:id',
    pathMatch: 'full'
  },
  {
    path: 'ra/release/:id',
    redirectTo: 'LinkCorner/ra/release/:id',
    pathMatch: 'full'
  },
  {
    path: 'urls',
    redirectTo: 'LinkCorner/urls',
    pathMatch: 'full'
  },
  {
    path: 'users',
    redirectTo: 'LinkCorner/users',
    pathMatch: 'full'
  },
  {
    path: 'validate',
    redirectTo: 'LinkCorner/validate',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    redirectTo: 'LinkCorner/menu',
    pathMatch: 'full'
  },
  {
    path: 'menu/add',
    redirectTo: 'LinkCorner/menu/add',
    pathMatch: 'full'
  },
  {
    path: 'menu/item/add',
    redirectTo: 'LinkCorner/menu/item/add',
    pathMatch: 'full'
  },
  {
    path: 'menu/edit/:id',
    redirectTo: 'LinkCorner/menu/edit/:id',
    pathMatch: 'full'
  },
  {
    path: 'menu/item/edit/:menuid/:id',
    redirectTo: 'LinkCorner/menu/item/edit/:menuid/:id',
    pathMatch: 'full'
  },
  {
    path: 'sql/backend',
    redirectTo: 'LinkCorner/sql/backend',
    pathMatch: 'full'
  },
  {
    path: 'sql/regression',
    redirectTo: 'LinkCorner/sql/regression',
    pathMatch: 'full'
  },
  {
    path: 'sql/misc',
    redirectTo: 'LinkCorner/sql/misc',
    pathMatch: 'full'
  },
  {
    path: 'LinkCorner',
    component: DashboardLandingComponent
  },
  {
    path: 'LinkCorner/rms',
    component: DashboardComponent
  },
  {
    path: 'LinkCorner/rtt',
    component: DashboardComponent
  },
  {
    path: 'LinkCorner/ra',
    component: DashboardComponent
  },
  {
    path: 'LinkCorner/rms/release/add',
    component: AddReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/rtt/release/add',
    component: AddReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/ra/release/add',
    component: AddReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/rms/release/add/:id',
    component: AddReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/rtt/release/add/:id',
    component: AddReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/ra/release/add/:id',
    component: AddReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/rms/release/edit/:id',
    component: UpdateReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/rtt/release/edit/:id',
    component: UpdateReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/ra/release/edit/:id',
    component: UpdateReleaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/rms/release/:id',
    component: ReleaseDetailsComponent
  },
  {
    path: 'LinkCorner/rtt/release/:id',
    component: ReleaseDetailsComponent
  },
  {
    path: 'LinkCorner/ra/release/:id',
    component: ReleaseDetailsComponent
  },
  {
    path: 'LinkCorner/urls',
    component: UrlsComponent
  },
  {
    path: 'LinkCorner/users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/validate',
    component: ValidateUserComponent
  },
  {
    path: 'LinkCorner/menu',
    component: MenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/menu/add',
    component: MenuAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/menu/item/add',
    component: MenuItemAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/menu/edit/:id',
    component: MenuUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/menu/item/edit/:menuid/:id',
    component: MenuItemUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'LinkCorner/sql/backend',
    component: BackendComponent
  },
  {
    path: 'LinkCorner/sql/regression',
    component: RegressionComponent
  },
  {
    path: 'LinkCorner/sql/misc',
    component: MiscellaneousComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
