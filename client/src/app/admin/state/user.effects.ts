import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, switchMap, catchError,  tap, take, mergeMap, filter } from 'rxjs/operators';
import { UserService } from './user.service';
import { UserActions } from './user.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ParcelActions } from '../../state/parcel.actions';
import { userSelector } from './user.selectors';
export const USER = 'user';

@Injectable()
export class UserEffects {
	private actions$ = inject(Actions);
	private userService = inject(UserService);
	private store = inject(Store);
	private router = inject(Router);

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.login),
			switchMap((action) => {
				return this.userService.login(action.user).pipe(
					map((res) => {
						if (res.error) {
							return ParcelActions.setError({ error: res.message});
						}
						const user = {username: action.user.username, token: res.token, role: res.role};
						localStorage.setItem(USER, JSON.stringify(user));
						this.router.navigateByUrl('/admin');
						return UserActions.loginSuccess({ user });
					}),
					catchError((error) => of(ParcelActions.setError({error})))
				);
			})
		)
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.logout),
			tap(() => {
				localStorage.removeItem(USER);
				this.router.navigateByUrl('/login')
			})
		), {dispatch: false}
	);

	changePassword$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.changePassword),
			switchMap((action) => {
				return this.userService.changePassword(action.user).pipe(
					map((res) => {
						if (res.error) {
							return ParcelActions.setError({ error: res.message});
						}
						this.router.navigateByUrl('/admin/settings')
						return ParcelActions.setAlert({ alert: { type: 'success', message : 'Change Password Successful' }});;
					}),
					catchError((error) => this.interceptError(error))
				);
			})
		)
	);
	getUsers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.getUsers),
			switchMap(() => {
				return this.store.select(userSelector).pipe(
					take(1),
					filter(user => !!user && !!user.token),
					mergeMap((user) => {
						return this.userService.getUsers(user?.token || '').pipe(
							mergeMap((res: any) => {
								if (res.error) {
									return of(ParcelActions.setError({ error: res.message}));
								}
								return of(UserActions.getUsersSuccess({users: res}));
							}),
							catchError((error) => this.interceptError(error))
						);
					})
				);
			})
		)
	);

	getAreas$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.getAreas),
			switchMap(() => {
				return this.store.select(userSelector).pipe(
					take(1),
					filter(user => !!user && !!user.token),
					mergeMap((user) => {
						return this.userService.getAreas(user?.token || '').pipe(
							mergeMap((res: any) => {
								if (res.error) {
									return of(ParcelActions.setError({ error: res.message}));
								}
								return of(UserActions.getAreasSuccess({areas: res}));
							}),
							catchError((error) => this.interceptError(error))
						);
					})
				);
			})
		)
	);

	createUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.createUser),
			switchMap((action) => {
				return this.userService.createUser(action.user).pipe(
					mergeMap((res: any) => {
						if (res.error) {
							return of(ParcelActions.setError({ error: res.message}));
						}
						return from([
							ParcelActions.setAlert({alert: { type: 'success', message : 'User created' }}),
						]);
					}),
					catchError((error) => this.interceptError(error))
				);
			})
		)
	);

	deleteUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.deleteUser),
			switchMap((action) => {
				return this.store.select(userSelector).pipe(
					take(1),
					filter(user => !!user && !!user.token),
					mergeMap((user) => {
						return this.userService.deleteUser(action.id, user?.token || '').pipe(
							mergeMap((res: any) => {
								if (res.error) {
									return of(ParcelActions.setError({ error: res.message}));
								}
								return of(ParcelActions.setAlert({alert: { type: 'success', message : 'User Delete' }}));
							}),
							catchError((error) => this.interceptError(error))
						);
					})
				);
			})
		)
	);

	createArea$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.createArea),
			switchMap((action) => {
				return this.store.select(userSelector).pipe(
					take(1),
					filter(user => !!user && !!user.token),
					mergeMap((user) => {
						return this.userService.createArea(action.area, user?.token || '').pipe(
							mergeMap((res: any) => {
								if (res.error) {
									return of(ParcelActions.setError({ error: res.message}));
								}
								this.router.navigateByUrl('/admin/tables');
								return from([
									ParcelActions.setAlert({alert: { type: 'success', message : 'Area Created' }}),
									UserActions.getAreas(),
								]);
							}),
							catchError((error) => this.interceptError(error))
						);
					})
				);
			})
		)
	);

	deleteArea$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.deleteArea),
			switchMap((action) => {
				return this.store.select(userSelector).pipe(
					take(1),
					filter(user => !!user && !!user.token),
					mergeMap((user) => {
						return this.userService.deleteArea(action.id, user?.token || '').pipe(
							mergeMap((res: any) => {
								if (res.error) {
									return of(ParcelActions.setError({ error: res.message}));
								}
								this.router.navigateByUrl('/admin/tables');
								return from([
									ParcelActions.setAlert({alert: { type: 'success', message : 'Area deleted' }}),
									UserActions.getAreas(),
								]);
							}),
							catchError((error) => this.interceptError(error))
						);
					})
				);
			})
		)
	);

	getTables$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.getTables),
			switchMap(() => {
				return this.store.select(userSelector).pipe(
					take(1),
					filter(user => !!user && !!user.token),
					mergeMap((user) => {
						return this.userService.getTables(user?.token || '').pipe(
							mergeMap((res: any) => {
								if (res.error) {
									return of(ParcelActions.setError({ error: res.message}));
								}
								return of(UserActions.getTablesSuccess({tables: res}));
							}),
							catchError((error) => this.interceptError(error))
						);
					})
				);
			})
		)
	);
	constructor() {}

	private interceptError(err: any) {
		const error = err.error?.message || err.statusText
		if ([401, 403].includes(err?.status)) {
			this.router.navigateByUrl('/login');
			return from([
				ParcelActions.setError({error}),
				UserActions.logout(),
			])
		}
		return of(ParcelActions.setError({error}));
	}
}
