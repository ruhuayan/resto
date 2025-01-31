import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../admin/state/user.actions';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container justify-content-center">
    <!-- <div class="content"> -->
      <form class="form-signin text-center" [formGroup]="form" (ngSubmit)="onSubmit()">
        <img class="top_img" src="assets/images/Logo-KlickShip.png" alt="KlickShipe" />
        <img class="klickship"src="assets/images/klickship.svg" alt="KlickShipe" />
        <h1 class="h3 my-3 font-weight-normal"></h1>
        <label for="inputUsername" class="sr-only">User Name *</label>
        <input type="text" id="inputUsername" formControlName="name" class="form-control" placeholder="{{ 'login.username' | translate }} *" required>
        <label for="inputPassword" class="sr-only">Password *</label>
        <input type="password" id="inputPassword" formControlName="password" class="form-control" placeholder="{{ 'login.password' | translate }} *" required>
        <div class="checkbox mb-3"></div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" [disabled]="!form.valid">{{ 'login.signin' | translate}}</button>
      </form>
    <!-- </div> -->
  </div>
  `,
 styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  private store = inject(Store);
  // private router = inject(Router);
  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
			name: new FormControl(''),
		  password: new FormControl(''),
		});
  }

  onSubmit() {
    this.store.dispatch(UserActions.login({user: this.form.value}))
  }
}
