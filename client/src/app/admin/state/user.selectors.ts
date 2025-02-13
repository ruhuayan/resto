import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './user.reducer';
import { UserRole } from '../admin.models';


export const userFeatureSelector = createFeatureSelector<
  Readonly<State>
>('user');

export const loadingSelector = createSelector(
  userFeatureSelector,
  (feature) => {
    return feature.loading;
  }
);

export const userSelector = createSelector(
  userFeatureSelector,
  (feature) => {
    return feature.user;
  }
);

export const isAdminSelector = createSelector(
  userSelector,
  (user) => user?.role === UserRole.ADMIN
);

export const usersSelector = createSelector(
  userFeatureSelector,
  (feature) => {
    return feature.users;
  }
);

export const tablesSelector = createSelector(
  userFeatureSelector,
  (feature) => {
    return feature.tables;
  }
);

export const areasSelector = createSelector(
  userFeatureSelector,
  (feature) => {
    return feature.areas;
  }
);
