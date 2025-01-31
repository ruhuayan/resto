import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordPayload, User } from '../admin.models';

@Component({
	selector: 'app-change-password-form',
	standalone: true,
	imports: [ReactiveFormsModule, TranslateModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form
			class="change-password-form row g-2"
			[formGroup]="form"
			(ngSubmit)="onSubmit()"
		>
			<div class="col-md-8 col-sm-10">
				<label for="inputUsername" class="form-label"
					>{{ 'profile.UserName' | translate }} *</label
				>
				<input
					type="text"
					id="inputUsername"
					formControlName="username"
					class="form-control"
					placeholder="{{ 'profile.username' | translate }} *"
					required
          readonly
				/>
			</div>
			<div class="col-md-8 col-sm-10">
				<label for="inputPassword" class="form-label"
					>{{ 'profile.OldPassword' | translate }} *</label
				>
				<input
					type="password"
					id="inputPassword"
					formControlName="password"
					class="form-control"
          minlength="6"
          maxlength="50"
					placeholder="{{ 'profile.OldPassword' | translate }} *"
					required
				/>
			</div>
			<div class="col-md-8 col-sm-10">
				<label for="inputNewPassword" class="form-label"
					>{{ 'profile.NewPassword' | translate }} *</label
				>
				<input
					type="password"
					id="inputNewPassword"
					formControlName="newPassword"
					class="form-control"
					placeholder="{{ 'profile.NewPassword' | translate }} *"
          minlength="6"
          maxlength="50"
					required
				/>
			</div>
			<div class="col-sm-12 mt-2">
				<button
					class="btn btn-lg btn-primary btn-block"
					type="submit"
					[disabled]="!form.valid"
				>
          {{ 'profile.Save' | translate }}
				</button>
			</div>
		</form>
	`,
})
export class ChangePasswordFormComponent {
  @Input()
  set user(_user: User | null) {
    if (_user?.username) {
      this.form.patchValue({
        password: '',
        newPassword: '',
        username: _user.username,
        token: _user.token,
      });
    }
  }  
	@Output() submitForm = new EventEmitter<PasswordPayload>();
	form: FormGroup;

	constructor(formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			username: new FormControl(''),
			password: new FormControl(''),
			newPassword: new FormControl(''),
      token: new FormControl('')
		});
	}

	onSubmit() {
		this.submitForm.emit(this.form.value);
	}
}
