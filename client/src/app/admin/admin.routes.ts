import { Route } from "@angular/router";
import { SettingsComponent } from "./settings/settings.component";
import { AdminComponent } from "./admin.component";
import { UsersComponent } from "./users/users.component";
import { TablesComponent } from "./tables/tables.component";
import { ProfileComponent } from "./profile/profile.component";
import { EditUserComponent } from "./users/edit-user.component";
import { EditAreaComponent } from "./tables/edit-area.component";

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
        children: [
          {
            path: 'area-add',
            component: EditAreaComponent,
            data: { mode: 'create' }
          },
          {
            path: 'area-edit',
            component: EditAreaComponent,
            data: { mode: 'edit' }
          },
          {
            path: 'add',
            component: EditAreaComponent,
            data: { mode: 'create' }
          },
          {
            path: 'edit',
            component: EditAreaComponent,
            data: { mode: 'edit' }
          },
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
