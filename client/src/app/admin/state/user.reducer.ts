import { createReducer, on } from "@ngrx/store";
import { Kiosk, Transaction, User } from "../admin.models";
import { UserActions } from "./user.actions";

export interface State {
  user: User | null;
  loading: boolean;
  users: User[];
  transactions: Transaction[];
  kiosks: Kiosk[];
}

export const initState: State = {
  user: null,
  loading: false,
  users: [],
  transactions: [],
  kiosks: [],
}

export const userReducer = createReducer(initState,
  on(UserActions.login, (state) => ({...initState, loading: true})),
  on(UserActions.loginSuccess, (state, { user }) => ({...state, user, loading: false })),
  on(UserActions.logout, (state) => ({...state, user: null })),
  on(UserActions.getUsers, (state) => ({...state, loading: true })),
  on(UserActions.getUsersSuccess, (state, { users }) => ({...state, users: users, loading: false })),
  on(UserActions.getTransactions, (state) => ({...state, loading: true })),
  on(UserActions.getTransactionsSuccess, (state, { transactions }) => ({...state, transactions, loading: false })),
  on(UserActions.getKiosks, (state) => ({...state, loading: true })),
  on(UserActions.getKiosksSuccess, (state, { kiosks }) => ({...state, kiosks, loading: false })),
  on(UserActions.createUser, (state, { user }) => ({...state, loading: true })),
  on(UserActions.editUser, (state, { user }) => ({...state, loading: true })),
);
