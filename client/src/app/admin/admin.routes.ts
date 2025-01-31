import { Route } from "@angular/router";
import { SettingsComponent } from "./settings/settings.component";
import { AdminComponent } from "./admin.component";
import { UsersComponent } from "./users/users.component";
import { TablesComponent } from "./tables/tables.component";
import { KiosksComponent } from "./kiosks/kiosks.component";
import { ProfileComponent } from "./profile/profile.component";
import { EditUserComponent } from "./users/edit-user.component";
import { EditKioskComponent } from "./kiosks/edit-kiosk.component";

export const ADMIN_ROUTES: Route[] = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full',
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'tables',
        component: TablesComponent,
      },
      {
        path: 'kiosks',
        component: KiosksComponent,
        children: [
          {
            path: 'add',
            component: EditKioskComponent,
            data: { mode: 'create' }
          },
          {
            path: 'edit',
            component: EditKioskComponent,
            data: { mode: 'edit' }
          }
        ]
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: 'add',
            component: EditUserComponent,
            data: { mode: 'create' }
          },
          {
            path: 'edit',
            component: EditUserComponent,
            data: { mode: 'edit' }
          }
        ]
      },
    ]
  }
];
