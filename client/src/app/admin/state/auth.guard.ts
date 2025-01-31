import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { USER } from './user.effects';
import { userSelector } from './user.selectors';
import { map } from 'rxjs/operators';
import { UserActions } from './user.actions';

export function AuthGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    const store = inject(Store);
    return store.select(userSelector)
      .pipe(
        map(user => {
          if (!!user && !!user.token && !!user.username) {
            return true;
          }
          try {
            const userString = localStorage.getItem(USER);
            if (userString === null) {
              throw('No User Found');
            }
            const user = JSON.parse(userString);
            if (!user?.token) {
              throw('User not authenticated');
            }
            store.dispatch(UserActions.loginSuccess({user}));
          } catch(err) {
            router.navigateByUrl('/login');
            return false;
          }
          return true;
        })
      )
  };
}
