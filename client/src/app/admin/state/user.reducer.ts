import { createReducer, on } from "@ngrx/store";
import { Area, Table, User } from "../admin.models";
import { UserActions } from "./user.actions";

export interface State {
  user: User | null;
  loading: boolean;
  users: User[];
  tables: Table[];
  areas: Area[];
}

export const initState: State = {
  user: null,
  loading: false,
  users: [],
  tables: [],
  areas: [],
}

export const userReducer = createReducer(initState,
  on(UserActions.login, (state) => ({...initState, loading: true})),
  on(UserActions.loginSuccess, (state, { user }) => ({...state, user, loading: false })),
  on(UserActions.logout, (state) => ({...state, user: null })),
  on(UserActions.getUsers, (state) => ({...state, loading: true })),
  on(UserActions.getUsersSuccess, (state, { users }) => ({...state, users: users, loading: false })),
  on(UserActions.getTables, (state) => ({...state, loading: true })),
  on(UserActions.getTablesSuccess, (state, { tables }) => ({...state, tables, loading: false })),
  on(UserActions.getAreas, (state) => ({...state, loading: true })),
  on(UserActions.getAreasSuccess, (state, { areas }) => ({...state, areas, loading: false })),
  on(UserActions.createUser, (state, { user }) => ({...state, loading: true })),
  on(UserActions.editUser, (state, { user }) => ({...state, loading: true })),
);
