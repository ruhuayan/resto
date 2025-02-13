import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Area, PasswordPayload, Transaction, User } from '../admin.models';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'Login': props<{ user: Readonly<User> }>(),
    'Change Password': props<{ user: Readonly<PasswordPayload> }>(),
    'Login Success': props<{ user: Readonly<User> }>(),
    'Logout': emptyProps(),
    'Get Users': emptyProps(),
    'Get Users Success': props<{ users: User[] }>(),
    'Get Transactions': emptyProps(),
    'Get Transactions Success': props<{ transactions: Transaction[] }>(),
    'Get Areas': emptyProps(),
    'Get Areas Success': props<{ areas: Area[] }>(),
    'Create Area': props<{ area: Readonly<Area> }>(),
    'Edit Area': props<{ area: Readonly<Area> }>(),
    'Delete Area': props<{ id: Readonly<string> }>(),
    'Create User': props<{ user: User }>(),
    'Edit User': props<{ user: Readonly<User> }>(),
    'Delete User': props<{ id: Readonly<string> }>(),
    'Delete Transaction': props<{ id: Readonly<string> }>(),
  },
});
