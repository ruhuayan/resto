import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChangePasswordFormComponent } from '../components/ change-password-form.component';
import { userSelector } from '../state/user.selectors';
import { PasswordPayload, User } from '../admin.models';
import { UserActions } from '../state/user.actions';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [ChangePasswordFormComponent, CommonModule, TranslateModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './profile.component.html',
	styles: `
		:host {
			flex: 1;
		}
	`
})
export class ProfileComponent {
	user$: Observable<User | null>;
	accordion = [true, false];

	private store = inject(Store);
	constructor() {
		this.user$ = this.store.select(userSelector);
	}

	onSubmit(user: PasswordPayload) {
		this.store.dispatch(UserActions.changePassword({user}));
	}
}
